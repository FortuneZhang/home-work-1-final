var orderResult = "";

$('#index').live('pagecreate',function(event){
    userToArray();
});


$('#choiceUser').live('pagecreate',function(event){
    //alert('This page was just enhanced by Jquery Mobile!');
    listUser();

});
$('#choiceRestaurant').live('pagecreate',function(event){
    $("#txtChoiceRestaurant").val("");
      listRestaurant();
});
$('#choicePackage').live('pagecreate',function(event){
    if( "" ==$("#txtChoiceRestaurant").val() )
    {
        alert("你要去哪个餐厅吃饭呢？");
        self.location='#index';
    }
   listPackage($("#txtChoiceRestaurant").val());
});
$('#viewOrder').live('pagecreate',function(event){
    viewOrder();
});

function listUser()
{
    $("#userContent").append('<ul class="ui-listview ui-listview-inset ui-corner-all ui-shadow" float="center" data-inset="true" data-divider-theme="b" data-role="listview">');
    for(i =0; i < users.length; i++)
    {
        $("#userContent").append(TurnToLink(users[i].name ,i,0)) ;
    }
    $("#userContent").append("</ul>");
}
function listRestaurant()
{
    $("#RestaurantContent").append('<ul class="ui-listview ui-listview-inset ui-corner-all ui-shadow" float="center" data-inset="true" data-divider-theme="b" data-role="listview">');
    for(i =0; i < restaurants.length; i++)
    {
        $("#RestaurantContent").append(TurnToLink(restaurants[i].name ,(i +10000),0)) ;
    }
    $("#RestaurantContent").append("</ul>");
}
function listPackage(res)
{

    $("#PackageContent").append('<ul class="ui-listview ui-listview-inset ui-corner-all ui-shadow" float="center" data-inset="true" data-divider-theme="b" data-role="listview">');
    for(i =0; i <  foods[res].length; i++)
    {
        $("#PackageContent").append(TurnToLink(foods[res][i].name ,(i +20000),foods[res][i].price.toFixed(2))) ;

    }
    $("#PackageContent").append("</ul>");
}

function TurnToLink(name,number,price)
{
    if(0 == number)
    {
        s = '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-top ui-btn-up-c" data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right">';
    }
    else
    {
        s = '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c"  data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" >';
    }

    s +='<div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a class="ui-link-inherit" id="'+ number+'"  href="javascript:addToTxtbox('+number +');">'+name;
    if(0 != price)
    {
        s += "<span style='float: right;'>"+'￥' +price +"</span>";

     }
    s +='</a> </div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow"> </span></div>';
    return s;
}
function addToTxtbox(info)
{
    con ="";
    con =document.getElementById(info).innerText;

    if(info < 10000)
    {
        $("#txtChoiceUser").val(con);
    }
    else if(info >= 10000 && info<20000 )
    {
       $("#txtChoiceRestaurant").val(con);
       $("#txtChoicePackage").val("");
    }
    else if(info >= 20000)
    {
        //全荤<span style="float: right;">￥13.00</span>


       $("#txtChoicePackage").val(con);
    }
    self.location='#helpOrder';
}


 function sureToSubmit()
 {
    b = true;
    b = '' !=$("#txtChoiceUser").val() &&'' !=$("#txtChoiceRestaurant").val() &&'' !=$("#txtChoicePackage").val();
    if(b)
    {
        orderResult +=$("#txtChoiceUser").val() +',' + $("#txtChoiceRestaurant").val() +',' +$("#txtChoicePackage").val() +';';
        $("#txtChoiceUser").val("");
        $("#txtChoicePackage").val("");
    }
    return b;
 }
 function viewOrder()
 {
     res = orderResult;
     ress = res.split(';')
     str ='<ul style="list-style: none;background-color:#6495ed;font-size:larger;margin-left:-1.3%;margin-right:-1.3%;"><li><strong >';
     $("#viewOrderContent").append(str+(ress.length-1) +'人已经订餐' + '</li></strong></ul>');
     showUserOrdered(ress);
     $("#viewOrderContent").append(str+(users.length -ress.length+1)+'人未订餐'+'</li></strong></ul>');
     showUserUnorder();

     showOrderFooter((ress.length-1),(users.length -ress.length+1),totlePrice);
 }

var userArray = new Array;;
function userToArray()
{
   for(k=0;k< users.length; k ++)
   {
      userArray.push(users[k].name);
   }


}
function matchOrderedUser(username)
{
    for(m=0;m<userArray.length;m++)
    {
        if(username == userArray[m])
        {
            userArray[m] = 0;
        }
    }
}
function showUserOrdered(ress)
{
    totlePrice =0;
    for(j =0; j <ress.length -1;j ++)
    {

        datas = ress[j].split(',');
        matchOrderedUser(datas[0]);
        str1 ='<ul style="list-style:none;" ><li><span style= "font-size: larger;">'+datas[0] ;
        price = datas[2].split('￥')[1];
        if(12 <= price)
        {
            str1 +='<div style="float: right; "><span style="color:red;font-size: small;"> ￥ ' +(price-12).toFixed(2) +'</span></div>';
        }
        if(12>price)
        {
            str1+= '<div style="float: right;"> <span >' + ' ￥ ' +price +'</span></div>';

        }
        totlePrice += parseFloat(price);
        str1 += '</li><li style="font-size: small;"> '+datas[1]+'&nbsp;&nbsp;'+datas[2].split('￥')[0]+' </li></ul>';
        $("#viewOrderContent").append(str1 + "<hr>");

    }

    //showOrderFooter((ress.length-1),(users.length -ress.length+1),totlePrice);
}
function showUserUnorder()
{
    for(m=0;m <userArray.length;m ++)
    {
        if(0 !=userArray[m])
        {
            str ='<ul><li><span style= "font-size: larger;">';
            str += userArray[m] +'</li></ul>';
            $("#viewOrderContent").append(str + "<hr>");
        }
    }
}
function showOrderFooter(ordered,unodered,price)
{
    str = "<h3 style=' text-align: center;'> "
    str += ordered + "人已经订餐" + "&nbsp;&nbsp;&nbsp;&nbsp;" + unodered + "人未订餐" + '总计'  + price.toFixed(2) + "元";
    str += "</h3>";
    $("#viewOrderFooter").append(str);
}
