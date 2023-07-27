
//객체기반으로 하는 이유는 변수 중복 방지하려고, 제이쿼리에 달러 사인의 중복을 막기 위해선?? 즉시표현함수
;(function($, window, document, a){

    class Wedding {
        init(){
            this.header()
            this.section1()
            this.section2()
            this.section3()
            this.section4()
            this.section5()
            this.section6()
            this.section7()
            this.section8()
            this.section9()
            this.section10()
            this.section11()
            this.footer()
            this.modal()
        };
        header(){

            // 첫 번 째 방법 
            // let toggle = 0;
            // $('.mobile-btn').on({
            //     click(){
            //         if(toggle===0){
            //             toggle=1 ; // 한 번 봤으니까 
            //             $('.moblie-menu').show();

            //         }
            //         else{
            //             toggle=0;
            //             $('.moblie-menu').hide();
            //         }
            //     }
            // })
            

            //두 번 째 방법 
            $('.mobile-btn').on({
                click(){
                    $('.moblie-menu').toggle(); // 한 번 누르면 켜지고 한 번 더 누르면 꺼짐
                }
            })
        
        $('.mobile-alink').on({
            click(){
                $('.mobile-menu').slideUp(0);
            }
        })
    }
//show는 한 번 누르면 열리고 한 번 더 눌리면 닫히는 거 안 됨 
    
        section1(){ //9시 넘어서 시작하는 수업 다시 듣기 
            //메인 슬라이드 페이드 인 아웃 효과
            let cnt=-1; // 
            let id=0;//컴퓨터 메모리에서 할당 받은 숫자를 기억하는
            //1. 메인 슬라이드 함수
            function mainSlide(){
                //$('.slide').css({zIndex:1}) //초기화, = 슬라이드1 말고는 죄다 z-index 1이다 
                $('.slide').eq(cnt).css({zIndex:3}).animate({opacity:0}, 1000);
                $('.slide').eq(cnt+1).css({zIndex:2});
                $('.slide').css({zIndex:1, opacity:1});
            }
            //2. 다음 카운트 함수 
            function nextCount(){
                cnt++; // 1 2
                if(cnt>1) { //2가 되면 멈춤 
                    clearInterval(id); //타이머 정지 
                }
                else {
                    mainSlide();
                }
            }
            
            //3. 3초 후에 슬라이드1 페이드 아웃되면서 실행구현
            id = setInterval(nextCount, 3000)//setInterval = 주어진 시간 내에서 계속 실행

        };
        section2(){

        };
        section3(){

        };
        section4(){

        };
        section5(){

        };
        section6(){
            $('.sumbit-btn').on({
                click(e){
                    $.ajax({
                        url:'./form_mail.php', //보낼 주소
                        type:'POST',//보낼 형식
                        dataType: 'JSON',
                        data:{
                            //객채 방식으로 보냄
                            "이름":$('#name').val(), //입력 상자는 보낼 때 반드시 val이라고 씀
                            "이메일":$('#email').val(),
                            "게스트인원수":$('#guests').val(),
                            "이벤트":$('#event').val()
                        },
                        success(result){//잘 보내지는지 확인하는 것
                            console.log("ajax 성공");
                            console.log(result);

                        },
                        error(error){
                            console.log("ajax 실패");
                            console.log(error);
                        }
                    });
                }
            })
        };
        section7(){};
        section8(){
            // 3초 후에 우측에서 좌측으로 -25% 부드럽게 이동하는 애니메이션
            //slide-wrap에서 애니메이션 할 건데 relative가 있어야 js로 애니메이션 가능하고 없다면 transform, translate 이용 하기 
            const slideWrap = $('.slide-wrap');
            const content = $('.content');
            let cnt = 0;
            // setTimeout(function(){
            //     slideWrap.animate({left:`${-25 * cnt}%`}, 600)

            // }, 3000); // 3초 있다 움직이기 설정

            //메인 슬라이드 함수
            function mainSlide(){
                slideWrap.animate({left:`${-25 * cnt}%`}, 600, 'easeInOutExpo')

            }

            // 다음 슬라이드 
            function nextSlide(){
                cnt++;
                if(cnt>1)(cnt=1);
                mainSlide();
            }

            // 이전 슬라이드
            function prevSlide(){
                cnt--;
                if(cnt<0)(cnt=0)
                mainSlide();
            }

            //터치 스와이프
            let touchStart = null; //초기화, 터치시작
            let touchEnd = null; //터치 끝
            
            //드래그
            let mouseDown = false; //드래그 다운이 되면 드래그 시작임을 나타내는 신호, 기본 설정값
            let dragStart = null;
            let dragEnd = null;
            content.on({//객체 방식 // 마우스가 어디서 시작해서 어디로 끝났는지 알아야 함
                mousedown(e){
                    mouseDown = true;
                    touchStart = event.clientX;
                    // console.log("touchStart 시작" + event.clientX);//터치 시작
                    //다운 했다가 업 했을 때의 방향을 알아야 함
                    //마우스다운업은 정해진 이름이고 let은 사용자 설정
                    //current target: 현제 내가 마우스를 클릭한 것의 부모박스를 나타냄, target:실제로 내가 딸깍 클릭한 것 
                    //중요한 건 originevent 여기서 나오는 클리이언트XY-이벤트 발생 대상 (이걸로 터치스와이프개발, 적어두기, 아주 중요) screenXY-브라우저 대상
                    dragStart = event.clientX - slideWrap.offset().left;
                },
                mouseup(e){
                    touchEnd = event.clientX
                    // console.log("touchEnd 끝" + event.clientX);//터치 끝
                    console.log(touchStart - touchEnd)
                    //디음 슬라이드
                    if(touchStart - touchEnd >0){
                        console.log('다음')
                        nextSlide();
                    }
                    //이전슬라이드
                    if(touchStart - touchEnd<0){
                        console.log('이전')
                        prevSlide();
                    }
                  mouseDown=false;  
                },

                mousemove(e){
                    if(mouseDown!==true) return; //다운이 되어야만 드래그를 한다.
                    console.log(e.clidenX);

                    dragEnd = e.clientX;
                    //마우스로 드래그 시작 ~ 끝 간격만 이동
                    console.log(dragEnd-dragStart);
                    slideWrap.css({left:dragEnd - dragStart});//end와 start의 값 간격만큼만 left 이동함
                }
            });


        };
        section9(){};
        section10(){};
        section11(){};
        footer(){};
        modal(){
            let num = 8; // or 0

               //10초 후에 1회 실행해서 모달창 띄우기
            //    setTimeout(function()
            //    {
            //     $('.modal').fadeIn();
            //     setInterval(function(){//3초 간격으로 계속 실행
            //         num++;
            //         if(num>15){num=8}
            //         $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).fadeOut(0).fadeIn(300);
            //     }, 3000)
            // },10000), // 팝업창 st

        //모달창 닫기
            $('.modal-close-btn').on({
                click(e){
                    e.preventDefault();
                    $('.modal').stop().fadeOut(600);
                }
            })
        //갤러리 이미지 클릭
        //모달창 열기 ==> 스크롤바 숨기기
            $('.img-btn').on({
                click(e){
                    e.preventDefault();//preventDefaul-->기본 기능 차단
                    console.log(new Date(). getTime());//이렇게 나온 값을
                    console.log(new Date(1689302312848));//date 괄호 안에 적게 되면 시간이 나옴
                    //클릭한 대로 이미지 바뀌는 법 1
                    //let img = $(this).attr('src')//내가 클릭하는 게 this가 됨, attribute-->속성

                    //클릭한 대로 이미지 바뀌는 법 2
                    //$('.modal img').prop('src', img); //src를 img로 바꾼다, 여기서 img가 머예요?? $(this).attr('src') 여기서 가져온 img 속성이잔아 이 속성을 모달에 있는 src 속성에다 넣으란 거즤 // 현재 클릭한ㅇ ㅣ미지 src 이미지를 넣어라! 
                    //attr로 가져와서 attr로 아예 수정해버렷네? attr 속성은 가져올 수도 있지만 src를 img로도 바꿀 수 있음, prop도 가능 / //prop이랑 attr의 차이는 prop 회원가입할 때 쓰는 입력창에 강력하게 쓰고 attr은 일반적으로 많이 사용
                    
                    //클릭한 대로 이미지 바뀌는 법 3
                    $('html').addClass('on');//스크롤바 생김
                    num = $(this).data('idx');
                    $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).fadeOut(0).fadeIn(300); 
                    $('.modal').fadeIn();
            }//${num}여기 num은 변수 
        })
        //X버트는 a태그로 만든 것이고 a태그의 기본 특성은 새로고침!! 
        //흰색창 클릭 창 닫기
        $('.modal .container').on({
            click(){
                $('html').removeClass('on'); //스크롤바 사라짐
                $('.modal').stop().fadeOut(600)
            }
        })

        //모달창 이미지 클릭 이벤트
        //부모 박스까지의 클릭 이벤트 전파 차단하기  
        $('.modal img').on({
            click(e){//e = event
                e.stopPropagation(); //나를 감싸는 부모 영역 이벤트의 전파를 차단-->본인만 먹힌다 아주 중요!!!!! 
                num++; // ++ 는 1 씩 증가한다는 거 
                if(num>15){
                    num=8 //마지막 이미지는 처음으로 다시 셋팅 
                }
                $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).fadeOut(0).fadeIn(300);
            }
        })

        //이전 화살 버튼 
        $('.modal-prev-btn').on({
            click(e){
                e.stopPropagation();
                num--;
                if(num<8){
                    num=15;
                }
                $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).fadeOut(0).fadeIn(300);
            }
        })
        //다음 화살 버튼 
        $('.modal-next-btn').on({
            click(e){
                e.stopPropagation();
                num++;
                if(num>15){
                    num=8;
                }
                $('.modal img').attr('src', `./img/wedding-img${num}.jpg`).fadeOut(0).fadeIn(300);
            }
        })
        };
    }

    const newWedding = new Wedding()
    newWedding.init();

})(jQuery, window, document); //window 창 전체, document는 웹문서