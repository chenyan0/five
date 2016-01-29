window.onload=function(){
	// 左栏用户信息
	var photo=document.getElementsByClassName('photo');
	for(var i=0;i<photo.length;i++){
		photo[i].style.backgroundImage='url(./imgs/'+(i+1)+'.jpg)';
	}
	var time=document.getElementsByClassName('time');
	var options=document.getElementById('options');
	var index=0,timerId;
	options.onmousedown=function(e){
		if(e.target!=this){
			e.target.style.webkitTransform='scale(0.9)';
		}
		if(e.target.getAttribute('id')=='start'){
			startgame();
			timerId=setInterval(fn,1000);	
		}
		if(e.target.getAttribute('id')=='fail'){
			tip('黑棋胜！');
			clearInterval(timerId);
		}
	};
	options.onmouseup=function(e){
		if(e.target!=this){
			e.target.style.webkitTransform='scale(1)';
		}
	};
	
	// 计时
	var minute=document.getElementsByClassName('minute'),
	    second=document.getElementsByClassName('second'),
	    sec=0,min=0;
	var fn=function(){
		second[0].innerHTML=sec;
		second[1].innerHTML=sec;
			if(sec==60){
				sec=0;
				min++;
				second[0].innerHTML=sec;
				minute[0].innerHTML=min;
				second[1].innerHTML=sec;
				minute[1].innerHTML=min;
			}
			sec++;
	};
		
	
	// -------------------------棋盘及游戏过程-------------------
	var ROW=15,
	    width=Math.floor(600-ROW)/ROW+'px',
	    sence=document.getElementById('sence'),
	    dict1={},
		dict2={},
	    row,
	    col;
	for(var i=0;i<ROW;i++){
		row=document.createElement('div');
		row.style.width='560px';
		row.style.height='1px';
		row.style.background='white';
		row.style.position='absolute';
		row.style.top=(300/ROW)+(600/ROW)*i+'px';
		row.style.left=300/ROW+'px';

		col=document.createElement('div');
		col.style.width='1px';
		col.style.height='560px';
		col.style.background='white';
		col.style.position='absolute';
		col.style.left=(300/ROW)+(600/ROW)*i+'px';
		col.style.top=300/ROW+'px';
		sence.appendChild(row);
		sence.appendChild(col);
	}
	for(var i=0;i<ROW;i++){
		for(var j=0;j<ROW;j++){
			var block=document.createElement('div');
			block.setAttribute('class','block');
			block.setAttribute('id',i+'_'+j);
			sence.appendChild(block);
			block.style.width=width;
			block.style.height=width;
		}
	}
	var blocks=document.getElementsByClassName('block');
	var startgame=function(){
	    kaiguan=true,
	    panduan=function(id,dic){
			var x=Number(id.split('_')[0]),
			    y=Number(id.split('_')[1]);
			var tx=x,ty=y;
			var hang=1,lie=1,zx=1,yx=1;
			while(dic[tx+'_'+(ty+1)]){
				hang++;
				ty++;
			}
			tx=x,ty=y;
			while(dic[tx+'_'+(ty-1)]){
				hang++;
				ty--;
			}

			tx=x,ty=y;
			while(dic[(tx+1)+'_'+ty]){
				lie++;
				tx++;
			}
			tx=x,ty=y;
			while(dic[(tx-1)+'_'+ty]){
				lie++;
				tx--;
			}
			tx=x,ty=y;
			while(dic[(tx+1)+'_'+(ty-1)]){
				zx++;
				tx++;
				ty--;
			}
			tx=x,ty=y;
			while(dic[(tx-1)+'_'+(ty+1)]){
				zx++;
				tx--;
				ty++;
			}
			tx=x,ty=y;
			while(dic[(tx+1)+'_'+(ty+1)]){
				ty++;
				yx++;
				tx++;
			}
			tx=x,ty=y;
			while(dic[(tx-1)+'_'+(ty-1)]){
				yx++;
				ty--;
				tx--;
			}
			if(hang==5||lie==5||zx==5||yx==5){
				return true;
			}else{
				return false;
			}
		};	
		for(var i=0;i<blocks.length;i++){
			blocks[i].onclick=function(){
				var id=this.getAttribute('id');
				if(this.hasAttribute('hasColor')){
					return;
				}
				this.style.webkitTransform='scale(0.9)';
				if(kaiguan==true){
					this.style.backgroundImage='url(./imgs/bai.png)';
					this.style.backgroundSize='cover';
					kaiguan=false;
					dict1[id]=true;
					if(panduan(id,dict1)){
						tip('白棋胜！');
						clearInterval(timerId);
					}
				
				}else{
					this.style.backgroundImage='url(./imgs/hei.png)';
					this.style.backgroundSize='cover';
					kaiguan=true;
					dict2[id]=true;
					if(panduan(id,dict2)){
						tip('黑棋胜！');
						clearInterval(timerId);
					}
				}
				this.setAttribute('hasColor','true');
				
			};
		}

	};

	var bifen=document.getElementsByClassName('bifen');
	var tip=function(s){
	    var tip=document.createElement('div');
		var goon=document.createElement('div');
		var exit=document.createElement('div');
		var win=document.createElement('div');
		var fail=document.createElement('div');
		win.setAttribute('class','result');
		var block1=document.createElement('div');
			block2=document.createElement('div');
			block1.setAttribute('class','win rs');
			block2.setAttribute('class','fail rs');
			block1.style.backgroundSize='cover';
			block2.style.backgroundSize='cover';
			block1.style.width=width;
			block1.style.height=width;
			block2.style.width=width;
			block2.style.height=width;
		var opGrade,ownGrade;
		if(s=='白棋胜！'){
			opGrade=bifen[0].innerHTML;
			ownGrade=++bifen[1].innerHTML;
			block1.style.backgroundImage='url(./imgs/bai.png)';
			block2.style.backgroundImage='url(./imgs/hei.png)';
			
		}else{
			opGrade=++bifen[0].innerHTML;
			ownGrade=bifen[1].innerHTML;
			block1.style.backgroundImage='url(./imgs/hei.png)';
			block2.style.backgroundImage='url(./imgs/bai.png)';
		}
		win.innerHTML='胜';
		win.style.left='60px';
		win.style.top='50px';
		win.style.textAlign='right';
		fail.setAttribute('class','result');
		fail.innerHTML='败';
		fail.style.left='220px';
		fail.style.top='50px';
		fail.style.textAlign='left';
		tip.setAttribute('class','tip');
		exit.setAttribute('class','button');
		goon.setAttribute('class','button');
		goon.style.left='60px';
		goon.style.top='200px';
		exit.style.left='240px';
		exit.style.top='200px';
		goon.innerHTML='继续';
		exit.innerHTML='退出';
		tip.appendChild(win);
		tip.appendChild(fail);
		tip.appendChild(goon);
		tip.appendChild(exit);
		sence.appendChild(tip);
		win.appendChild(block1);
		fail.appendChild(block2);
		goon.onclick=function(){
			sence.removeChild(tip);
			for(var i in dict1){
				document.getElementById(i).style.boxShadow='none';
				document.getElementById(i).style.webkitTransform='none';
				document.getElementById(i).style.background='none';
				document.getElementById(i).removeAttribute('hasColor','true');
			}
			for(var j in dict2){
				document.getElementById(j).style.boxShadow='none';
				document.getElementById(j).style.webkitTransform='none';
				document.getElementById(j).style.background='none';
				document.getElementById(j).removeAttribute('hasColor','true');
			}
			dict1={};
			dict2={};
			for(var i=0;i<second.length;i++){
				second[i].innerHTML=0;
			}
			for(var i=0;i<minute.length;i++){
				minute[i].innerHTML=0;
			}
			bifen[0].innerHTML=opGrade;
			bifen[1].innerHTML=ownGrade;
			clearInterval(timerId);
			sec=0,min=0;
			for(var i=0;i<blocks.length;i++){
				blocks[i].onclick=null;
			}
		};
		exit.onclick=function(){
			window.close();
		};
	};
	document.onmousedown=function(e){
		e.preventDefault();
		if(e.target.id=='exit'){
			window.close();
		}
	};




	
	
};
