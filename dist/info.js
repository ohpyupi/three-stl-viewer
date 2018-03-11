const project = {
	name: "Node API Skeleton",
	desc: `
This skeleton is designed to give node developers to easily and quickly set up Node project.
`,
	metadata: {
		version: '0.0.0',
		author: 'ohpyupi',
		git: 'https://github.com/ohpyupi',
		date: '2017/12/5',
	},
}
body = document.querySelector('body'),
header = document.createElement('h1'),
desc = document.createElement('p')
table = createTable(project.metadata);

window.document.title = project.name;
header.innerHTML = project.name;
desc.innerHTML = project.desc;
body.appendChild(header);
body.appendChild(desc);
body.appendChild(table);

function createTable(obj={}) {
	let keys = Object.keys(obj);
	let table = document.createElement('table');
	table.border = '1';
	let header = document.createElement('tr');
	let row = document.createElement('tr');
	for (let i = 0; i < keys.length; i++) {
		let th = document.createElement('th');
		let td = document.createElement('td');
		th.innerHTML = keys[i].toUpperCase();
		td.innerHTML = obj[keys[i]];
		header.appendChild(th);
		row.appendChild(td);
	}
	table.appendChild(header);
	table.appendChild(row);
	return table;
}
