const _  = require('lodash');


/*
  Dijikstra's Algorithm
  ======================
  Shortest path from one node to every other node
  Time complexity: O( |E| + |V|log|v| )


   pseudo:

  //  for each vertex v in graph:
  //      dist[v] = inf
  //      previous[v] = inf
  //  dist[source] = 0
  //  Q = set of all nodes in graph
  //
  //  while Q is not empty:
  //    u = node in Q with smallest dist[]
  //    remove u from Q
  //    for each neighbour v of u:
  //        temp = dist[u] + Edge(u,v)
  //        if temp < dist[v]
  //            dist[v] = temp
  //            previous[v] = u
  //
  //  return previous

* */

function Dijikstra( graph, source) {

  let dist = {};
  let previous = {};
  let Q = {};

  Object.keys(graph).forEach(v =>{
    dist[v] = Number.POSITIVE_INFINITY;
    previous[v] = null;
    Q[v] = 1;
  });

  dist[source] = 0;

  while( !_.isEmpty(Q)){

    let u = Object.keys(Q).reduce((a,b) => dist[a] < dist[b]? a : b); // it's better to implement here with a minimum Heap!
    delete Q[u];

    for( const [v, Edge] of Object.entries(graph[u].links)){

      if(Q.hasOwnProperty(v)){ // only neighbours still in Q
        const temp = dist[u] + Edge;
        if(temp < dist[v]){
          dist[v] = temp;
          previous[v] = u;
        }
      }
    }
  }


  return {previous, dist};
}


function runAlgorithm() {
  const graph = {
    'a': { links: { f: 7, c: 14, d: 9 }},
    'c': { links: { a: 14 , d: 2, b: 9 }},
    'b': { links: { c: 9, e: 6 }},
    'e': { links: { b: 6, d: 11, f: 15 }},
    'd': { links: { e: 11, f: 10, a: 9, c: 2 }},
    'f': { links: { e: 15, d: 10, a: 7 }}
  };

  solution = Dijikstra(graph, 'a');

  for( const [v, distance] of Object.entries(solution.dist)){

    console.log(`vertex: ${v}, distance to source: ${distance}`);
  }

  console.log('==========================================');

  for( const [v, prev] of Object.entries(solution.previous)){

    console.log(`vertex: ${v}, prev: ${prev}`);
  }


}


console.log("start Dijikstra");
runAlgorithm();