let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let $firstCopy = $images.eq(0).clone(true)
let $lastCopy = $images.eq($images.length-1).clone(true)

$slides.append($firstCopy) // 在末尾插入克隆的第一张
$slides.prepend($lastCopy) // 在开头插入克隆的最后一张
$slides.css({transform: 'translateX(-400px)'}) // 默认起始位置

let current = 0
$buttons.eq(0).on('click', function(){
	if (current == 3){ // 说明是从最后一张切到第一张
		$slides.css({transform: 'translateX(-2000px)'})
			.one('transitionend', function(){
				$slides.hide().offset() // 隐藏动画
				$slides.css({transform: 'translateX(-400px)'}).show()
			})		
	}else{
		$slides.css({transform: 'translateX(-400px)'})
	}
	current = 0
})
$buttons.eq(1).on('click', function(){
	$slides.css({transform: 'translateX(-800px)'})
	current = 1
})
$buttons.eq(2).on('click', function(){
	$slides.css({transform: 'translateX(-1200px)'})
	current = 2
})
$buttons.eq(3).on('click', function(){
	if (current == 0){ // 说明是从第一张切到最后一张
		$slides.css({transform: 'translateX(0px)'})
			.one('transitionend', function(){
				$slides.hide().offset()
				$slides.css({transform: 'translateX(-1600px)'}).show()
		})		
	}else{
		$slides.css({transform: 'translateX(-1600px)'})
	}
	current = 3
})