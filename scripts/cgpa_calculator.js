const totalCredit = document.querySelector('.total-credit');
const jsResultDiv1 = document.querySelector('.js-result_div1');
const renderResult = document.querySelector('.render_result');
const jsRenderCGPA = document.querySelector('.js_render-cgpa');
const jsCGPA = document.querySelector('.js_cgpa');


document.body.addEventListener('keyup', (event)=>{
    getGPA();
    changeNumColour();
})

const courseTotal = [
    'GES 100.1', 'GES 102.1', 'CHM 130.1', 'MTH 120.1',
    'MTH 110.1', 'PHY 101.1', 'FSB 101.1', 'PHY 102.1'
]
const creditUnit = [
    3, 2, 3, 3,
    3, 3, 3, 1,
]

function createWorkSpace(){
    for (let i = 0; i <courseTotal.length; i++){
        const resultData = {
            course: courseTotal[i],
            credit: creditUnit[i],
        }
        const tr = document.createElement('tr');
        for(let i = 0; i < 3; i++){
            const td = document.createElement('td');
            if(i === 0){
                td.classList.add('credit');
                td.innerText = resultData.course;
            } else if (i === 1){
                const input = document.createElement('input');
                input.classList.add('grade');
                input.setAttribute('maxlength', '1');
                td.appendChild(input);
            } else if (i === 2){
                td.classList.add('credit');
                td.innerText = resultData.credit;
            }
            tr.appendChild(td);
        };
        document.querySelector('.js-tbody').appendChild(tr);
    }    
}
createWorkSpace();

function getGrade(){
    const gradeInput = document.getElementsByClassName('grade');
    let containGradeInput = [];
    for(let i = 0; i < gradeInput.length ; i++){ 
        const gradeInputValue = gradeInput[i];
        containGradeInput.push(gradeInputValue.value);
    }
    return containGradeInput;
}

function popToNextLine(){
    const inputFields = document.querySelectorAll('.grade');

    inputFields.forEach((field, index) => {
        field.addEventListener('input', (e) => {
            if(e.target.value.length === e.target.maxLength){
                const nextInput = inputFields[index + 1];
                if(nextInput){
                    nextInput.focus();
                }
            }
        })
        field.addEventListener('keydown', (event) => {
            if(event.keyCode === 8 && field.value === ''){
                // event.preventDefault();


                if(inputFields[index - 1]){
                    const previousField = inputFields[index - 1];
                    if(previousField){
                        previousField.focus();
                    }
                }
            }
        })
    });
}
popToNextLine();

function getTotalCreditUnits(){
    let sum = 0;
    for(let i = 0; i < creditUnit.length; i++){
        sum += creditUnit[i];
    };
    return sum;
};
totalCredit.innerText = `Total Credit Units: ${getTotalCreditUnits()}`

function getGradePoint(grade){
    let point = 0;
   for(let i = 0; i < grade.length; i++){
        if(grade[i] === 'A' ||  grade [i] === 'a'){
            point = 5.00;
        } else if (grade[i] === 'B' || grade [i] === 'b'){
            point = 4.00;
        } else if(grade[i] === 'C' || grade [i] === 'c'){
            point = 3.00;
        } else if (grade[i] === 'D' || grade [i] === 'd'){
            point = 2.00;
        } else if (grade[i] === 'E' || grade [i] === 'e'){
            point = 1.00
        } else if (grade[i] === 'F' || grade [i] === 'f'){
            point = 0.00
        }
    }
    let gradePoint = point
    return gradePoint;
};

function getQualityPoint(){
   const  gradeLiteral = getGrade();
   let qualityPoint = 0;
   const containQualityPoint = [];

   for(let i = 0; i < gradeLiteral.length; i++){
       const allCreditUnit  = creditUnit[i];
       const dummy = gradeLiteral[i]
       
       qualityPoint = allCreditUnit * getGradePoint(dummy);
       containQualityPoint.push(qualityPoint);
    }
    return containQualityPoint;
}; 

function getTotalQualityPoint(){
    const qualityPointList = getQualityPoint();
    let totalQualityPoint = 0;

   for(let i = 0; i <  qualityPointList.length; i++){
        totalQualityPoint += qualityPointList[i];
   }
   return totalQualityPoint;
} 

function getGPA(){
   const GPA = getTotalQualityPoint()/getTotalCreditUnits();
   jsResultDiv1.innerText = `Total Quality Points: ${getTotalQualityPoint()}`;

    jsRenderCGPA.innerText = `Your C.G.P.A is:`;
   jsCGPA.innerText = `${GPA.toFixed(2)}`;

   return GPA;
};

function changeNumColour(){
    const GPA = getGPA();
    // This is to change the color of the numbers displayed depending on the magnitude of the score
   if(GPA >= 0 && GPA <= 2){
    jsCGPA.style = `
        color: rgb(90, 0, 0);
    `;
    } else if(GPA > 2 && GPA <5){
        jsCGPA.style = `
            color: rgb(119, 75, 4);
        `;
    } else if (GPA  === 5){
        jsCGPA.style = `
            color: rgb(1, 90, 1);
        `;
    }
}
