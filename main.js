let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({transform: 'translateX(-400px)'}) // 初始化起始位置
bindEvents()
$('#previous').on('click', function(){ // 上一张
	goToSlide(current-1)
})
$('#next').on('click', function(){ // 下一张
	goToSlide(current+1)
})
let timer = setInterval(function(){ // 自动播放
	goToSlide(current+1)
}, 2000)
$('.container').on('mouseenter', function(){ // 鼠标移入窗口轮播停止
	window.clearInterval(timer)
}).on('mouseleave', function(){ // // 鼠标移出窗口轮播继续
	timer = setInterval(function(){
		goToSlide(current+1)
	}, 2000)
})

function makeFakeSlides(){
	let $firstCopy = $images.eq(0).clone(true)
	let $lastCopy = $images.eq($images.length-1).clone(true)

	$slides.append($firstCopy) // 在末尾插入克隆的第一张
	$slides.prepend($lastCopy) // 在开头插入克隆的最后一张
}
function bindEvents(){
	$('#buttonWrapper').on('click', 'button', function(e){ // 选择器：buttonWrapper > button 的点击事件
	let $button = $(e.currentTarget)
	let index = $button.index()
	goToSlide(index)
	})
}
function goToSlide(index){
	if(index > $buttons.length-1){ // 防止"下一张"超出范围
		index = 0
	}else if(index < 0){ // 防止"上一张"超出范围
		index = $buttons.length-1
	}
	if(current === $buttons.length-1 && index === 0){ // 最后一张到第一张
		$slides.css({transform: `translateX(${-($buttons.length+1)*400}px)`})
		.one('transitionend', function(){
				$slides.hide().offset() // 隐藏动画
				$slides.css({transform: 'translateX(-400px)'}).show()
			})		
	}else if(current === 0 && index === $buttons.length-1){ // 第一张到最后一张
		$slides.css({transform: 'translateX(0px)'})
		.one('transitionend', function(){
			$slides.hide().offset()
			$slides.css({transform: `translateX(${-(index+1)*400}px`}).show()
		})
	}else{
		$slides.css({transform: `translateX(${-(index+1)*400}px)`})
	}
	current = index
}
