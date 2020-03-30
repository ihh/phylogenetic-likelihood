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
  let children = {}, branchLength = {}, branchByChild = {}
  children[root] = []
  branchLength[root] = 0
  branches.forEach ((branch) => {
    const parent = branch[0], child = branch[1], len = branch[2]
    children[parent] = children[parent] || []
    children[child] = children[child] || []
    children[parent].push (child)
    branchLength[child] = len
    branchByChild[child] = branch
  })
  let descendants = {}, distFromRoot = {}, maxDistFromRoot = 0
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
    return [node].concat (clade)
  }
  const preorder = getSubtree (root), nodes = preorder
  let preorderRank = {}
  preorder.forEach ((node, n) => preorderRank[node] = n)
  const preorderBranches = preorder.slice(1).map ((node) => {
    const branch = branchByChild[node]
    return [ preorderRank[branch[0]], preorderRank[branch[1]], branch[2] ]
  })
  const postorderBranches = preorderBranches.slice(0).reverse()
  const leaves = nodes.filter ((node) => children[node].length == 0)
  const internals = nodes.filter ((node) => children[node].length != 0)
  const leafPreorderRank = leaves.map ((node) => preorderRank[node])
  const internalPreorderRank = internals.map ((node) => preorderRank[node])
  return { root, nodes, leaves, internals, branches, children, descendants, branchLength, preorder, preorderRank, preorderBranches, postorderBranches, leafPreorderRank, internalPreorderRank, distFromRoot, maxDistFromRoot }
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

const getMatrixExponentials = (model, treeIndex) => {
  const chars = model.alphabet.split('')
  const rateMatrix = chars.map ((ci, i) => chars.map (cj, j) => model.subrate[ci][cj] || 0)
  chars.forEach ((ci, i) => {
    rateMatrix[i][i] = 0;
    chars.forEach (cj, j) => {
      if (i != j)
        rateMatrix[i][i] -= rateMatrix[i][j];
    }
  })
  return treeIndex.preorderBranches.map ((branch) => mathjs.expm (mathjs.multiply (rateMatrix, branch[2])))
}

const initColumn = (treeIndex, alphabetIndex) => {
  return new Array (treeIndex.nodes.length).fill(0)
    .map (() => new Float32Array (alphabetIndex.size))
}

const logsumexp = (a, b) => Math.max (a, b) + Math.log (1 + Math.exp (-Math.abs (a - b)));

const fillColumnUp = (treeIndex, alphabetIndex, columnChars, column) => {
  const nodes = treeIndex.nodes.length, alphSize = alphabetIndex.size;
  treeIndex.leafPreorderRank.forEach ((leaf) => column[leaf].set (alphabetIndex.init (columnChars[leaf])))
  treeIndex.internalPreorderRank.forEach ((leaf) => column[leaf].set (alphabetIndex.initForMissing))
  treeIndex.postorderBranches.forEach ((branch) => {
    // ...
  })
}

module.exports = { models,
                   indexNewickJS,
                   indexBranchList };

