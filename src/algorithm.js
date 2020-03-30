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
  return { root, nodes, branches, children, descendants, branchLength, preorder, preorderRank, preorderBranches, distFromRoot, maxDistFromRoot }
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

module.exports = { models,
                   indexNewickJS,
                   indexBranchList };

