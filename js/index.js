// window.onload=function(){
// var rightList=document.querySelector('.right');
// var leftList=document.querySelector('.left');
// leftList.style.height=v.documentElement.clientHight-leftTitle.offsetHeight="px";
// rightList.style.height=v.documentElement.clientHight-rightTitle.offsetHeight="px";
// }
var todo=[
    {
    	id:1,
    	title:"新列表1",
    	color:"#FF8400",
    	list:[{
    		title:"事件1",
    		done:false
    	},
    	{
    		title:"事件2",
    		done:true
    	},
    	{
    		title:"事件3",
    		done:false
    	},
    	{
    		title:"事件4",
    		done:false
    	}]
    },
    {
    	id:2,
    	title:"新列表2",
    	color:"#CC72E1",
    	list:[{
    		title:"wew",
    		done:true
    	},
    	{
    		title:"wewdsfs",
    		done:false
    	},
    	{
    		title:"fdg",
    		done:false
    	},
    	{
    		title:"dasaf",
    		done:false
    	}]
    },
    {
    	id:3,
    	title:"新列表3",
    	color:"#61D937",
    	list:[{
       		title:"dsefe",
    		done:false
    	},
    	{
    		title:"fdfddf",
    		done:false
    	},
    	{
    		title:"现实的",
    		done:true
    	},
    	{
    		title:"古代的",
    		done:true
    	}]
    }
]
var colors=["#FF8700","#CC72E1","#61D937","#1BACF8","#F7CA00","#A0815C","#FF2967"];
var icloud=angular.module('icloud',[]);
icloud.controller('iclouds',function($scope,localStg){
//	$scope.todo=localStg.getData('todo');
	 $scope.todo=todo;
    $scope.index=$scope.todo.length-1;
    $scope.flag=false;

    $scope.optflag=false;
    $scope.colors=colors;
    $scope.changeTitle=$scope.todo[$scope.index].title;
     $scope.changeColor=$scope.todo[$scope.index].color;

    $scope.check =function(i){
      $scope.index=i;
      $scope.changeTitle=$scope.todo[i].title;
      $scope.changeColor=$scope.todo[i].color;
      $scope.optflag=false;
    }
    // 已完成数量
    $scope.doneNums=0;
    $scope.getdoneNums=function(){
    	$scope.doneNums=0;
    	var list =$scope.todo[$scope.index].list;
    	angular.forEach(list,function(v,i){
    		if (v.done) {
    			$scope.doneNums++;
    		}
    	})
    }
    $scope.getdoneNums();
    
     $scope.addlist=function(){
    	$scope.todo[$scope.index].list.push({
    		title:'',
    		done:false
    	})
    	localStg.saveData('todo',$scope.todo)
    }

	$scope.addItem=function(){
		$scope.ids=$scope.todo[$scope.todo.length-1].id+1;
		$scope.index=$scope.todo.length;
		$scope.todo.push({
			id:$scope.ids,
			title:'新列表'+$scope.ids,
			color:colors[$scope.todo.length%7],
			list:[]
		})
		localStg.saveData('todo',$scope.todo)
	}
	$scope.clearCom=function(){
		var list=$scope.todo[$scope.index].list;
		var arr=[];
		angular.forEach(list,function (v,i){
           if (v.done==false) {
           	arr.push(v);
           };
		})
		$scope.todo[$scope.index].list=arr;
		$scope.getdoneNums();
		$scope.flag=false;
		localStg.saveData('todo',$scope.todo);
	}
	$scope.set=function(o,f){
		o.done=f;
		$scope.getdoneNums();
		localStg.saveData('todo',$scope.todo)
	}
	$scope.change=function(o,text){
		o.title=text.target.innerHTML;
		localStg.saveData('todo',$scope.todo)
	}

	$scope.sColor=function(c){
	$scope.changeColor=c;
}
   $scope.comChange=function () {
      var o=$scope.todo[$scope.index];
        o.title=$scope.changeTitle;
        o.color=$scope.changeColor;
        $scope.optflag=false;
        localStg.saveData('todo',$scope.todo);
    }
    $scope.delList=function(){
    	if($scope.todo.length==1){
    		alert('至少需保留一条数据')
    		return;
    	}
	 $scope.todo.splice($scope.index,1);
        $scope.index=$scope.todo.length-1;
        $scope.optflag=false;
        localStg.saveData('todo',$scope.todo);
}
	$scope.$watch('index',function(){
    	$scope.getdoneNums();
    	$scope.flag=false;
    })
})

icloud.factory('localStg',function(){
	return{
		getData:function(key){
			var d=localStorage.getItem(key);
    			return d==null?[]:JSON.parse(d);
		},
		saveData:function(key,data){
			localStorage.setItem(key,JSON.stringify(data));
		},
		deltData:function(key){
			localStorage.removeItem(key);
		}
	}
})



