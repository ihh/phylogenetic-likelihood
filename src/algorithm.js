const mathjs = require ('mathjs');
const models = require ('./models');

const getRoots = (branches) => {
  const isNode = {}, hasParent = {}
  branches.forEach ((branch) => {
    const [p, c] = branch
    isNode[p] = isNode[c] = hasParent[c] = true
  })
  return Object.keys(isNode).filter ((n) => !hasParent[n]).sort()
}

const indexBranchList = (branches) => {
  let { root } = data, rootSpecified = typeof(root) !== 'undefined'
  const roots = getRoots (branches)
  if (roots.length == 0 && (branches.length > 0 || !rootSpecified))
    throw new Error ("No root nodes")
  if (rootSpecified) {
    if (roots.indexOf(root) < 0)
      throw new Error ("Specified root node is not a root")
  } else {
    if (roots.length != 1)
      throw new Error ("Multiple possible root nodes, and no root specified")
    root = roots[0]
  }
  let children = {}, parent = {}, branchLength = {}, branchByChild = {}
  children[root] = []
  branchLength[root] = 0
  branches.forEach ((branch) => {
    const p = branch[0], child = branch[1], len = branch[2]
    children[p] = children[p] || []
    children[child] = children[child] || []
    children[p].push (child)
    parent[child] = p
    branchLength[child] = len
    branchByChild[child] = branch
  })
  let descendants = {}, siblings = {}, distFromRoot = {}, maxDistFromRoot = 0
  const getSubtree = (node, parent) => {
    if (!node)
      throw new Error ("All nodes must be named")
    if (seenNode[node])
      throw new Error ("All node names must be unique (duplicate '" + node + "')")
    seenNode[node] = true
    distFromRoot[node] = (typeof(parent) !== 'undefined' ? distFromRoot[parent] : 0) + branchLength[node]
    maxDistFromRoot = Math.max (maxDistFromRoot, distFromRoot[node])
    const kids = children[node]
    let clade = []
    clade = kids.reduce ((clade, child) => clade.concat (getSubtree (child, node)), [])
    descendants[node] = clade
    kids.forEach ((c) => siblings[c] = kids.filter ((s) => s != c));
    return [node].concat (clade)
  }
  const preorder = getSubtree (root), nodes = preorder
  siblings[root] = []
  let preorderRank = {}
  preorder.forEach ((node, n) => preorderRank[node] = n)
  const preorderBranches = [null].concat (preorder.slice(1).map ((node) => {
    const branch = branchByChild[node]
    return [ preorderRank[branch[0]], preorderRank[branch[1]], branch[2] ]
  }))
  const postorderBranches = preorderBranches.slice(0).reverse()
  const leaves = nodes.filter ((node) => children[node].length == 0)
  const internals = nodes.filter ((node) => children[node].length != 0)
  const leafPreorderRank = leaves.map ((node) => preorderRank[node])
  const internalPreorderRank = internals.map ((node) => preorderRank[node])
  const siblingsPreorderRank = preorder.map ((node) => siblings[node].map ((sibling) => preorderRank[sibling]))
  const parentPreorderRank = preorder.map ((node) => typeof(parent[node]) === 'undefined' ? -1 : preorderRank[parent[node]])
  return { root, nodes, leaves, internals, branches, children, descendants, siblings, parent,
           branchLength, distFromRoot, maxDistFromRoot,
           preorder, preorderRank, preorderBranches, postorderBranches, leafPreorderRank, internalPreorderRank, siblingsPreorderRank, parentPreorderRank }
}

const getNewickJSBranchList = (newickJS) => {
  const getName = (obj) => (obj.name = obj.name || ('node' + (++nodes)))
  let branches = []
  const traverse = (parent) => {  // auto-name internal nodes
    if (parent.branchset)
      parent.branchset.forEach ((child) => {
        branches.push ([getName(parent), getName(child), Math.max (child.length, 0)])
        traverse (child)
      })
  }
  traverse (newickJS)
  return branches
}

const indexNewickJS = (newickJS) => indexBranchList (getNewickJSBranchList (newickJS));

const indexAlphabet = (alphabet) => {
  const chars = alphabet.split('')
  const charToIndex = {}
  chars.forEach ((c, i) => charToIndex[c] = i)
  return {
    size: alphabet.length,
    chars,
    charToIndex,
    initForChar: chars.map ((c, i) => {
      const a = new Float32Array (alphabet.length).fill(-Infinity);
      a[i] = 0;
      return a;
    }),
    initMissing: new Float32Array (alphabet.length).fill(0),
    init: (c) => {
      const i = charToIndex[c]
      return typeof(i) === 'undefined' ? initMissing : initForChar[i]
    }
  }
}

const getLogProbs = (model, treeIndex) => {
  const chars = model.alphabet.split('')
  const rateMatrix = chars.map ((ci, i) => chars.map (cj, j) => model.subrate[ci][cj] || 0)
  chars.forEach ((ci, i) => {
    rateMatrix[i][i] = 0;
    chars.forEach (cj, j) => {
      if (i != j)
        rateMatrix[i][i] -= rateMatrix[i][j];
    }
  })
  const logMatrixExponentials = treeIndex.preorderBranches.map ((branch) => mathjs.log (mathjs.expm (mathjs.multiply (rateMatrix, branch[2]))))
  const logRootProb = model.rootprob.map ((p) => mathjs.log(p))
  return { logMatrixExponentials, logRootProb }
}

// initColumn allocates the logE, logF, and logG data structures
const initColumn = (treeIndex, alphabetIndex) => {
  return new Array (treeIndex.nodes.length).fill(0)
    .map (() => new Float32Array (alphabetIndex.size))
}

const logsumexp = (a, b) => Math.max (a, b) + Math.log (1 + Math.exp (-Math.abs (a - b)));

// logF[node][state] = P(observations under node|state of node)
// logE[node][state] = P(observations under node|state of node's parent)
// logL = log-likelihood of entire column
const fillLeavesToRoot = (opts) => {
  let { treeIndex, alphabetIndex, columnChars, model, logProbs, logF, logE } = opts
  const nodes = treeIndex.nodes.length, alphSize = alphabetIndex.size;
  const { logMatrixExponentials, logRootProb } = logProbs;
  logE = logE || initColumn (treeIndex, alphabetIndex)
  logF = logF || initColumn (treeIndex, alphabetIndex)
  treeIndex.leafPreorderRank.forEach ((leaf) => logF[leaf].set (alphabetIndex.init (columnChars[leaf])))
  treeIndex.internalPreorderRank.forEach ((leaf) => logF[leaf].set (alphabetIndex.initForMissing))
  treeIndex.postorderBranches.forEach ((branch, b) => {
    const logMatrixExp = logMatrixExponentials[b];
    const logFparent = logF[b[0]], logFchild = logF[b[1]], logEchild = logE[b[1]];
    for (let ci = 0; ci < alphSize; ++ci) {
      let logp = -Infinity
      for (let cj = 0; cj < alphSize; ++cj)
        logp = logsumexp (logp, logMatrixExp[ci][cj] + logFchild[cj])
      logEchild[ci] = logp
      logFparent[ci] += logp
    }
  })
  let logL = -Infinity
  if (nodes > 0)
    for (let ci = 0; ci < alphSize; ++ci)
      logL = logsumexp (logL, logRootProb[ci] + logF[0][ci])
  return { logE, logF, logL }
}

// logG[node][state] = P(observations not under node,state of node)
const fillRootToLeaves = (opts) => {
  const { treeIndex, alphabetIndex, columnChars, logProbs, logF, logE, logG } = opts
  const nodes = treeIndex.nodes.length, alphSize = alphabetIndex.size;
  const { logMatrixExponentials, logRootProb } = logProbs;
  logG = logG || initColumn (treeIndex, alphabetIndex)
  for (let i = 0; i < alphSize; ++i)
    logG[0][i] = logRootProb[i]
  treeIndex.preorderBranches.forEach ((branch, b) => {
    if (branch !== null) {
      const logMatrixExp = logMatrixExponentials[b], siblings = treeIndex.siblingsPreorderRank[b[1]];
      const logGparent = logG[b[0]], logGchild = logG[b[1]], logEsiblings = siblings.map ((s) => logE[s]);
      for (let cj = 0; cj < alphSize; ++cj) {
        let logp = -Infinity
        for (let ci = 0; ci < alphSize; ++ci)
          logp = logsumexp (logp, logGparent[ci] + logMatrixExp[ci][cj] + logEsiblings.reduce ((l, logEsibling) => l + logEsibling[ci], 0))
        logGchild[cj] = logp
      }
    }
  })
  return { logG }
}

// posterior probabilities of node states & branch transitions
const nodePostProb = (opts) => {
  const { logF, logG, logL, nodeNum, i } = opts
  return mathjs.exp (logG[nodeNum][i] + logF[nodeNum][i] - logL)
}

const branchPostProb = (opts) => {
  const { logE, logF, logG, logL, childNum, i, j, treeIndex, logProbs } = opts
  const { logMatrixExponentials } = logProbs;
  const b = treeIndex.preorderBranches[childNum]
  const parent = b[0], child = b[1], siblings = treeIndex.siblingsPreorderRank[c]
  return mathjs.exp (logG[parent][i] + logMatrixExponentials[branchNum][i][j] + logF[child][j]
                     + siblings.reduce ((l, sibling) => l + logE[sibling][i], 0)
                     - logL)
}

const nodePostProfiles = (opts) => {
  const { treeIndex, model, nodeSeq } = opts
  // WRITE ME
}

module.exports = { models,
                   indexNewickJS,
                   indexBranchList };

