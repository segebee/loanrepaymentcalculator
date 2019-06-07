let interest, amount, principal, currentValue, prevValue,i;
let arr = [];
let obj = {};
function Reducing(amount, interest, tenure, principal) {
  firstRepayment = (interest*amount)/100 + principal;
    firstRepayment =         Math.round(firstRepayment * 100)/100
    arr.push({'1':firstRepayment});

    if(tenure > 1) {
	    for (i = 1; i < tenure;i++) {
	        currentValue = (interest * (amount-(parseInt(Object.keys(arr[i-1]))*principal))/100)+principal;
	        currentValue = Math.round(currentValue * 100)/100
            arr.push({[i+1]:currentValue});
	    }
	  }

   	let repayments = "";
   	arr.map((val, i)=>(
      Object.keys(val).map(function(key) {
        repayments += val[key] != NaN? `<li><span class="repayments_list__title"> Month ${key} </span>
        	<span class="repayments_list__text"> &#x20a6; ${val[key]}</span></li>`: '';
      })
    ))
    return repayments;
}
function Flatrate(principal, interest, tenure ) {
  var monthlyRepayment = ((principal/tenure) + (5*interest/100));
  // monthlyRepayment = Math.round(monthlyRepayment * 100)/100;
  // monthlyRepayment += ` per month for ${tenure} month(s)`;
  for(i = 1;i <= tenure;i++) {
    arr.push({[i]:monthlyRepayment});
  }
  let repayments = "";
  arr.map((val, i)=>(
   Object.keys(val).map(function(key) {
     repayments += val[key] != NaN? `<li><span class="repayments_list__title"> Month ${key} </span>
       <span class="repayments_list__text"> &#x20a6; ${val[key]}</span></li>`: '';
   })
 ))
 return repayments;
}

function calculate() {
    // This clears what is rendered on the screen on every input update
    arr = [];
    // e.preventDefault();
    var interest_type = document.getElementById("interest_method").value;
    
    var interestVal = document.getElementById("interest").value;
    obj.interest = interestVal;
    var amountVal = document.getElementById("amount").value;
    obj.amount = amountVal;
    var tenureVal = document.getElementById("tenure").value;
    obj.tenure = tenureVal;

    amount = parseInt(obj.amount);
    interest = parseInt(obj.interest);
    tenure = parseInt(obj.tenure);
    principal = amount/tenure;
    let calculated_val = interest_type === "Reducing" ? Reducing(amount, interest, tenure, principal): Flatrate(amount, interest, tenure,principal);
    

    // console.log(repayments)
    const repayments_block = "#repayments_block"
    const repayments_list = "#repayments_list"
    jQuery(repayments_list).html(calculated_val);
    return jQuery(repayments_block).slideDown();
}
