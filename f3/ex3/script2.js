class SpanComp extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.number = 0;
    }
    connectedCallback(){
        document.querySelector('input').addEventListener('change',(ev)=>{
            console.log('changed');
            this.updateVal(parseInt(document.querySelector('input').value))
        })
        this.render();
    }
    updateVal(number){
        this.number = number;
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML=`
        <span> 
        ${this.number}
        </span>
        `;
    }
}

customElements.define('span-component', SpanComp);
var numberEl = document.getElementsByTagName('input')[0];
var number = parseInt(numberEl.value);

window.setInterval(()=>{
    number = numberEl.value;
    if (number==0)
    return
    number--;
    numberEl.value = number;
    numberEl.dispatchEvent(new Event('change'));
},1000)