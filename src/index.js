window.searchSelect = class{
    id=null;
    dom=null;
    mainColor='';
    searchType=[];
    searchClick=function({selectValue,inputedValue}){}
    constructor({
        id,
        mainColor='#e56a24',
        searchType=[{text:'请选择',value:''}],
        searchClick=function({selectValue,inputedValue}){}
    }){
        if(!id) throw new Error('Id is null');
        this.id=id;
        this.mainColor = mainColor;
        this.searchType=searchType;
        this.searchClick=searchClick;
        this.dom=document.getElementById(id);
        this.render();
    }
    renderStyle(){
        let str=`<style>`;
        str+=`#${this.id}{border-bottom:1px solid ${this.mainColor};display:flex;height:30px}`;
        str+=`#${this.id} select,#${this.id} input{border:none;}`;
        str+=`#${this.id} select{width:10%;}`;
        str+=`#${this.id} input{width:80%;outline:0}`;
        str+=`#${this.id} button{width:10%;border:1px solid ${this.mainColor};background-color:white;color:${this.mainColor};margin-bottom:1px}`;
        str+=`#${this.id} button:hover{color:white;background-color:${this.mainColor};}`;
        str+=`</style>`;
        return str;
    }
    render(){
        const selectOption = this.searchType.reduce((total,item)=>{
            total+=`<option value="${item.value}">${item.text}</option>`;
            return total;
        },'')
        this.dom.innerHTML=`${this.renderStyle()}
<select>${selectOption}</select>
<input type="text" placeholder="请输入内容">
<button type="button">查询</button>
        `;
        const button = this.dom.getElementsByTagName('button')[0];
        button.addEventListener('click',e=>{
            e.stopPropagation();
            const selectedValue = this.dom.getElementsByTagName('select')[0].value.trim();
            const inputedValue = this.dom.getElementsByTagName('input')[0].value.trim();
            this.searchClick({selectedValue,inputedValue});
        },false)
    }
}