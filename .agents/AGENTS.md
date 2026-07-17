# Adding a workflow node

Three edits, all under eatures/workflows/nodes/:

1. the impl file (e.g. open-url.ts) — the node's executor logic,
2. register it in 
ode-executors.ts — the satisfies contract makes a missing
   executor a compile error for action nodes,
3. add its manifest entry in 
ode-registry.ts — kind, label, icon, accent, its
   input ields, and the outputs downstream nodes can reference.

The run task and the canvas step node are registry-driven — never touch them to add
a node.
