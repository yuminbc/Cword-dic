const url2 = window.location.href
const url = new URL(url2);
const urlParams = url.searchParams;


const selectpoint = urlParams.get('keyword')

const query= urlParams.get('w')
// const search = document.getElementById('search')
const submitBtn = document.getElementById('submit')

const seloption = selectpoint
console.log(seloption)
console.log(query)
// console.log(search)
//    const container = document.getElementById('container')
// const BASE_URL = 'http://localhost:5050/api/words'
const BASE_URL = 'https://crawling-word-dic.herokuapp.com/api/words'


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
function getData(baseUrl){

   // 서버 index.js 파일에 반드시 cors 옵션에 localhost:5500 주소를 허용한다고 설정해야 함
   console.log(seloption)
   console.log(query)
//    console.log(search)

   if(checkIfStringHasSpecialCharacter(query)){
    enableSubmitBtn(false)//활성화
    alert("특수문자는 검색할수없습니다")
    serend.innerHTML=""
    container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다"
    window.history.back();
    return ;
    }

    if(checkIfStringHasNumbers(query)){
    enableSubmitBtn(false)
    alert("숫자는 검색할수없습니다")
    serend.innerHTML=""
    container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다"
    window.history.back();
    return ;
    }
    if(checkIfStringHasLetters(query)){
        enableSubmitBtn(false)
    alert("영어는 검색할수없습니다")
    serend.innerHTML=""
    container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다"
    window.history.back();
    return ;
    }
    if(query== ""){
        alert("검색어를 입력해주세요")
        window.history.back();
        return ;
    }


   fetch(`${baseUrl}/${seloption}/${query}`, {
        headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*" // 이 코드 때문에 CORS 에러가 발생한것임. 이 코드 주석처리하면 프론트엔드에서 곧바로 외부 API 접근가능하다. (프록시나 서버가 필요없음)
        }
   })
   .then( res => res.json())
   .then( data => {
        enableSubmitBtn(false)
        submitBtn.disabled = false
        console.log(data)
        const {words} = data;

        if(words.length === 0){
            serend.innerHTML=""
            container.innerHTML ="&quot;"+ query+"&quot;와 일치하는 항목이 없습니다";
            return;
        }

        const template = words.map(word => {
            return (
                `
                <div class="item">
                        <div class="word">
                            <pre><p><a href = "${word.r_link}" target="_blank">${word.r_word}</a> ${word.r_seq? word.r_seq:""}</p></pre>
                            <pre><a class="r_chi">${word.r_chi}</a><a class = "r_pos">${word.r_pos}</a></pre>
                        </div>
                        
                        <p class="r_des">${word.r_des}</p>
                </div>
                `
            )
        })
        if(seloption =="word"){
            var seloptions  = "단어"; 
        }
        else if(seloption =="des"){
            var seloptions  = "설명"; 
        }
        else if(seloption =="worddes"){
            var seloptions  = "단어+설명"; 
        }
        container.innerHTML = template.join("")
        serend.innerHTML="&quot;"+query+"&quot;의 " + seloptions + " 검색결과는 "+words.length+"개 입니다."+"<hr>"
        search.innerHTML=query
        console.log(query)

        
    
    })
}

submitBtn.addEventListener('click', function(){
//    console.log(this)
        console.log(query.value)
        getData(BASE_URL, query.value,selectpoint.value)
  
})


window.addEventListener('DOMContentLoaded', function() { 
    getData(BASE_URL)
});

search.value=query

document.ft.keyword.value=seloption;
