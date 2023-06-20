class Data extends HTMLElement {
    constructor() {
	 super();
	 const shadow = this.attachShadow({ mode: 'open' });
	 const table = document.createElement('table');
	 const thead = document.createElement('thead');
	 const tbody = document.createElement('tbody');
	 const tableHeaders = Object.keys(jsonData[0]);
	 const tableHeaderRow = document.createElement('tr');
	 const style = document.createElement('style');
	 style.textContent = `
        table {
         border-collapse: collapse;
         width: 100%;
        }
        th, td {
          border: 1px solid #ccc;
           padding: 8px;
         text-align: left;
    }
       }
       `;
	 shadow.appendChild(style);
  
	 tableHeaders.forEach((header) => {
	     const th = document.createElement('th');
	     th.textContent = header;
	     tableHeaderRow.appendChild(th);
	 });
	 thead.appendChild(tableHeaderRow);
	 jsonData.forEach((item) => {
	     const tr = document.createElement('tr');
	     tableHeaders.forEach((header) => {
		  const td = document.createElement('td');
		  if(typeof item[header] ==="object"){
		      const button = document.createElement('button');
		      button.addEventListener('click', this.Open.bind(item[header]))
		      button.innerText=header;
		      td.appendChild(button);
		  }
		  else{
		      td.textContent = item[header];
		  }
		  tr.appendChild(td);
	     });
	     tbody.appendChild(tr);
	 });
	 table.appendChild(thead);
	 table.appendChild(tbody);
	 shadow.appendChild(table);
    }
    
    Open() {
	 let div =document.createElement('div');
	 let overlay =document.createElement('div');
	 let closemodal =document.createElement('div');
	 closemodal.innerHTML=`<span id="close-btn">&#10005;</span>`
	 overlay.classList.add('overlay');
	 div.classList.add('modal-card');
	 closemodal.classList.add('close')
	 const table2 = document.createElement('table');
	 const thead2 = document.createElement('thead');
	 const tbody2= document.createElement('tbody');
	 const tableHeaderRow2 = document.createElement('tr');
	 const tr = document.createElement('tr')
	 for(let i in this){
	     tableHeaderRow2.innerHTML +=`<th>${i}</th>`;
	     if(typeof this[i]==="object"){
		  tr.innerHTML +=`<td><button onclick="">location</button></td>`
	     }
	     else {
		  tr.innerHTML+=`<td>${this[i]}</td>`;
	     }
	 }
	 thead2.appendChild(tableHeaderRow2);
	 table2.appendChild(thead2);
	 tbody2.appendChild(tr);
	 table2.appendChild(tbody2);
	 div.appendChild(closemodal)
	 div.appendChild(table2);
	 document.body.appendChild(overlay);
	 document.body.append(div)
	 document.getElementById('close-btn').addEventListener('click', function() {
	     document.querySelector('.overlay').remove();
	     document.querySelector('.modal-card').remove();
	 });
    }
}
customElements.define('t-data', Data);
