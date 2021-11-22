const query = document.getElementById('search')
const submitBtn = document.getElementById('submit')
const BASE_URL = 'https://crawling-word-dic.herokuapp.com/api/words'
// const BASE_URL = 'http://localhost:5050/api/words'


// 검색어에 특수문자가 들어간 경우 검색이 안되도록 함
function checkIfStringHasSpecialCharacter(str) {
    const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
    return re.test(str);

}
//숫가 들어간경우
function checkIfStringHasNumbers(str){
    return /\d/.test(str);
}
//영어 문자가 들어간 경우 검색이 안되도록 함
function checkIfStringHasLetters(str){
    return /[a-zA-Z]/.test(str);
}

function checkIfStringHasNull(str){
    return null(str);
}

// 버튼 활성화
function enableSubmitBtn(state){
    submitBtn.disabled = state
}      
// 서버 데이터 가져오기
function getData(baseUrl, query){
    enableSubmitBtn(true)//비활성화
    console.log("서버 접속중.....")


    if(checkIfStringHasSpecialCharacter(query)){
        enableSubmitBtn(false)//활성화
       alert("특수문자는 검색할수없습니다")
       serend.innerHTML=""
       container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다"
       return;
    }
   
    if(checkIfStringHasNumbers(query)){
       enableSubmitBtn(false)
       alert("숫자는 검색할수없습니다")
       serend.innerHTML=""
       container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다"
       return;
    }
    if(checkIfStringHasLetters(query)){
        enableSubmitBtn(false)
       alert("영어는 검색할수없습니다")
       serend.innerHTML=""
       container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다"
       return;
    }



    
    fetch(`${baseUrl}/${query}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(data => {
        enableSubmitBtn(false)
        // submitBtn.disabled = false
        console.log(data)
        const {words} = data;
        //데이터 유효성 검증
        if(query== ""){
            alert("검색어를 입력해주세요")
            return;
        }

        else if (words.length == 0){
            container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다"
            return;
        }

        serend.innerHTML="&quot;"+query+"&quot;의 검색결과는 "+words.length+"개 입니다."+"<hr>"

    })
}
 
submitBtn.addEventListener('click', function(){
    console.log(query.value)
    getData(BASE_URL, query.value)
})
query.addEventListener("keypress",function(e){
    console.log('key pressed')
    if(e.keyCode === 13){
        getData(BASE_URL,query.value)
    }
})
window.addEventListener('DoMCcontentLoaded',function(){
    getData(BASE_URL)
})