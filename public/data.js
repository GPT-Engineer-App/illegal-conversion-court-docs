const data = [
    {
        caseType: "Illegal Conversion",
        keyIssues: "Converted commercial to residential",
        outcome: "Fined",
        lawsReferenced: "NYC Building Code §28-210.1",
        keyArguments: "Safety violations, lack of certificate of occupancy",
        finalRulings: "Ordered to revert to commercial use"
    },
    {
        caseType: "Occupancy Certificate",
        keyIssues: "Lack of certificate of occupancy",
        outcome: "Eviction",
        lawsReferenced: "NYC Administrative Code §28-118.3.2",
        keyArguments: "Unlawful occupancy, safety concerns",
        finalRulings: "Eviction upheld, fines imposed"
    }
];

const tableBody = document.getElementById('data-table');

data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="py-2 px-4 border-b border-gray-200">${item.caseType}</td>
        <td class="py-2 px-4 border-b border-gray-200">${item.keyIssues}</td>
        <td class="py-2 px-4 border-b border-gray-200">${item.outcome}</td>
        <td class="py-2 px-4 border-b border-gray-200">${item.lawsReferenced}</td>
        <td class="py-2 px-4 border-b border-gray-200">${item.keyArguments}</td>
        <td class="py-2 px-4 border-b border-gray-200">${item.finalRulings}</td>
    `;
    tableBody.appendChild(row);
});