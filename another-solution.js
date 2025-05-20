function solution(A, B) {
    const N = A.length;
    const cityCount = N + 1;
    const graph = Array.from({ length: cityCount }, () => []);

    for (let i = 0; i < N; i++) {
        graph[A[i]].push(B[i]);
    }

    // Start with candidate as 0
    let candidate = 0;
    for (let i = 1; i < cityCount; i++) {
        if (!canReach(graph, i, candidate)) {
            candidate = i;
        }
    }

    // Verify that all other cities can reach the candidate
    for (let i = 0; i < cityCount; i++) {
        if (i !== candidate && !canReach(graph, i, candidate)) {
            return -1;
        }
    }

    return candidate;

    function canReach(graph, start, target) {
        const visited = new Array(cityCount).fill(false);
        const stack = [start];

        while (stack.length) {
            const node = stack.pop();
            if (node === target) return true;
            if (visited[node]) continue;
            visited[node] = true;
            for (const neighbor of graph[node]) {
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }

        return false;
    }
}
