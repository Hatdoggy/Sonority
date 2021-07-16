let desc1 = document.querySelector('#desc1');
let desc2 = document.querySelector('#desc2');
let desc3 = document.querySelector('#desc3');
let desc4 = document.querySelector('#desc4');

let tracks = document.querySelector('#tracks');

let body = document.querySelector('body');
let html = document.querySelector('html');

let load = {
	track:false,
	desc1:false,
	desc2:false,
	desc3:false,
	desc4:false
}

let bp = {
	track:0,
	desc1:0,
	desc2:0,
	desc3:0,
	desc4:0	
}

const loadTrack = ()=>{
	let items = document.querySelectorAll('span.opa');

	items.forEach((elem,ndx) => {
		elem.classList.remove('none');
		elem.style.animation = `${.5 + ndx}s fade`
	})

	load.track = true;
}

const loadDesc = (val,dir)=>{
	let target = document.querySelector(`#${val} img`);
	target.classList.remove('none');
	target.style.animation = `.5s ${dir === "left"?'fromRight':'fromLeft'}`;

	load[val] = true
}

const identify = (top)=>{
	if(top >= bp.desc4 && !load.desc4){
		loadDesc('desc4','right');
	}else if(top >= bp.desc3 && !load.desc3){
		loadDesc('desc3','left');
	}else if(top >= bp.desc2 && !load.desc2){
		loadDesc('desc2','right');
	}else if(top >= bp.desc1 && !load.desc1){
		loadDesc('desc1','left');
	}else if(top >= bp.track && !load.track){
		loadTrack()	
	}	
}

const setPoint = ()=>{
	bp.track = tracks.offsetTop - 200;
	bp.desc1 = desc1.offsetTop - 200;
	bp.desc2 = desc2.offsetTop - 200;
	bp.desc3 = desc3.offsetTop - 200;
	bp.desc4 = desc4.offsetTop - 200;
	setScroll();
}

const setScroll = ()=>{
	body.onscroll = (event)=>{
		setPoint();
		identify(window.pageYOffset)
	}
}

const setExit = ()=>{
	let exit = document.querySelector('#exit');
	exit.onclick = ()=>{
		document.querySelector('#mob-nav').classList.add('none')
	}
}

const mediaChange = ()=>{
	let nav = document.querySelector('ul');
	let burg = document.querySelector('#burger');

	setScroll();

	if(document.documentElement.clientWidth < 1000){
		nav.classList.add('none')
		burg.style.display = "inline-block";
		burg.onclick = ()=>{
			document.querySelector('#mob-nav').classList.remove('none')
			setExit(exit)
		}
	}
	else{
		burg.style.display = "none";
	}

}

mediaChange();

window.onresize = ()=>{
	mediaChange();
}
