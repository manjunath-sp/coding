function solution(A, B) {
    const N = A.length;
    const cityCount = N + 1;
    const graph = Array.from({ length: cityCount }, () => []);

    for (let i = 0; i < N; i++) {
        // Reverse the direction for reverse traversal
        graph[B[i]].push(A[i]);
    }

    function dfs(start, visited) {
        visited[start] = true;
        for (const neighbor of graph[start]) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited);
            }
        }
    }

    for (let i = 0; i < cityCount; i++) {
        const visited = new Array(cityCount).fill(false);
        dfs(i, visited);
        if (visited.every(v => v)) return i;
    }

    return -1;
}

console.log(solution([1,2,3],[0,0,0]));
console.log(solution([0, 1, 2, 4, 5],[2, 3, 3, 3, 2]));
