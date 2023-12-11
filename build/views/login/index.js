function getView(){
    let view = {
        login : ()=>{
            return `
        <div class="row">
     
            <div class="col-md-3 col-sm-0 col-lg-3 col-lx-3">
                
            </div>

            <div class="col-md-5 col-sm-12 col-lg-5 col-lx-5">
   
                <div class="card shadow p-2 card-rounded border-secondary">

                    <div class="card-header text-center bg-white">
                        <div class="row">
                            <div class="col-4">

                            </div>
                            <div id="parallax_logo" class="col-4">
                                <img data-depth="1.0" src="./favicon.png" width="65" height="65">                            
                            </div>
                            <div class="col-4" align="right">
                                <br>
                                <button class="btn btn-outline-info btn-lg btn-circle shadow" onclick="funciones.shareAppWhatsapp();">
                                        <i class="fal fa-paper-plane"></i>
                                </button>
                            </div>    
                        </div>
                        
                    </div>
                    <div class="card-body">
                        <form class="" id="frmLogin" autocomplete="off">
                            <div class="form-group">
                                <select class="negrita form-control border-secondary border-top-0 border-right-0 border-left-0" id="cmbSucursal">
                                    
                                </select>
                                
                            </div>
                            <div class="form-group">
                                
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-user"></i>
                                        </span>
                                    </div>
                                    <input class="form-control border-secondary border-top-0 border-right-0 border-left-0" type="text" id="txtUser" placeholder="Escriba su usuario" required="true">
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-lock"></i>
                                        </span>
                                    </div>
                                    <input class="form-control border-secondary border-top-0 border-right-0 border-left-0" type="password" id="txtPass" placeholder="Escriba su contraseña" required="true">
                                </div>
                                        
                            </div>
                            <br>
                            <div class="form-group" align="center">
                                <button class="btn btn-secondary btn-lg shadow col-12 btn-rounded"  type="submit" id="btnIniciar">
                                    <i class="fal fa-unlock"></i>
                                    Ingresar
                                </button>
                            </div>
                            <div class="form-group" align="right">
                                <small class="">Mercados Efectivos - ${versionapp}</small>
                                <br>
                                <small>
                                    <a href="https://apigen.whatsapp.com/send?phone=50257255092&text=Ayudame%20con%20la%20app%20de%20Mercados%20Efectivos...%20">
                                        por Alexis Burgos
                                    </a>
                                </small>
                            </div>
                        </form>
                    </div>

            
    

                </div>
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4"></div>

                         

       
            `
        }
    };

    root.innerHTML = view.login();
};



function addListeners(){
    
    console.log('iniciando login... ');
    
    let frmLogin = document.getElementById('frmLogin');
    let btnIniciar = document.getElementById('btnIniciar');
    frmLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
    
        almacenarCredenciales();

        btnIniciar.innerHTML = '<i class="fal fa-unlock fa-spin"></i>';
        btnIniciar.disabled = true;

        apigen.empleadosLogin(frmLogin.cmbSucursal.value,frmLogin.txtUser.value.trim(),frmLogin.txtPass.value.trim())
        .then(()=>{
            
            //document.body.requestFullscreen();
            //por lo visto se deshabilitan las scroll bars en fullscreen
            selectDateDownload();
        })
        .catch(()=>{
            btnIniciar.disabled = false;
            btnIniciar.innerHTML = '<i class="fal fa-unlock"></i>Ingresar'
        });
    });


    //carga las sucursales directamente desde código
    document.getElementById('cmbSucursal').innerHTML = '<option value="" disabled selected hidden>Selecciona una sede</option>' + funciones.getComboSucursales();

    selectDateDownload() //carga la info inicial
    .then(()=>{
        try {
            document.getElementById('cmbSucursal').value = GlobalCodSucursal;
            console.log(GlobalCodSucursal);
        } catch (error) {
            console.log('error al cargar sucursal')
            console.log(error)
        }
    })
   

    
    var parallax_logo = document.getElementById('parallax_logo');
    var parallaxInstance = new Parallax(parallax_logo);
   

};


function InicializarVista(){
   getView();
   addListeners();

   //getCredenciales();
   iniNevada(100,80);
};


async function almacenarCredenciales(){
    const cred = new PasswordCredential({
        id: document.getElementById('txtUser').value,
        name: document.getElementById('cmbSucursal').value,
        password: document.getElementById('txtPass').value
    })

    await navigator.credentials.store(cred)

};

function getCredenciales(){
   if ('credentials' in navigator) {
  navigator.credentials.get({password: true})
  .then(function(creds) {

      console.log(creds);
    //Do something with the credentials.
    document.getElementById('txtUser').value = creds.id;
    document.getElementById('cmbSucursal').value = creds.name;
    document.getElementById('txtPass').value = creds.password;

  });
    } else {
    //Handle sign-in the way you did before.
    };
}




/*** NIEVE *** */

class oCopo{
  constructor(tam, id){
     this.x = 0;
     this.y = 0;
     this.size = tam;
     this.nombre = id
     this.obj = document.createElement("div");
     this.obj.setAttribute('id',id);
     this.obj.setAttribute('name','snow');
     this.obj.innerText="*";
     this.obj.style.position = "absolute";
     this.obj.style.fontSize = tam+"px";
     this.obj.style.color = "white";
     document.body.appendChild(this.obj)
}
dibujar(x,y){
     this.x = x;
     this.y = y;
     this.obj.style.top = this.y+"px";
     this.obj.style.left = this.x+"px";
     }
}
function iniCopos(num, anc, alto){
   var copos = new Array(num);
   var tam, x, y;
   for (let i = 0; i<num; i++)
     {
     tam = Math.round(Math.random()*10)+ 8;
     copos[i] = new oCopo(tam, "c"+i);
     x = parseInt(Math.random()*anc);
     y = parseInt(Math.random()*alto);
     copos[i].dibujar(x,y);
     }
return copos;
}
function iniNevada(num, vel)
{
var ancho = document.body.offsetWidth-10;
var alto = window.innerHeight-10;
var losCopos = iniCopos(num, ancho, alto)
nevar(losCopos, ancho,alto, vel);
} 
function nevar(copos, coposAncho, coposAlto, vel)
{
var x, y;
for (let i = 0; i < copos.length; i++)
    {
    y = copos[i].y;
    x = copos[i].x;
    if (Math.random() > 0.5)
        y += parseInt(Math.random()+1);
    y += parseInt(Math.random()+2);
    if (y >= (coposAlto - copos[i].size))
        {
            y = Math.round(Math.random()*10);
            x  =parseInt(Math.random()*coposAncho-1); 
        }
        copos[i].dibujar(x,y); 
    }
    
    timerNieve = setTimeout(nevar, vel, copos,  coposAncho, coposAlto, vel);

}


