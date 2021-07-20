console.log("El elemento o etiqueta canvas permite implementar diferentes estilos de dibujo. Mediante la propiedad getContext,");
console.log("del elemento canvas, podemos usar una interfaz '2d' o 'webgl' una librería basada en OpenGL que permite desarrollar");
console.log("gráficos tridimensionales");

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 50);

console.log();

console.log("La superfície de una figura se puede pintar con el método fillRect, mientras que si solo queremos resaltar el borde");
console.log("tenemos que utilizar strokeRect. La propiedad fillStyle, establece el color que se utilizará para pintar una superfície.");
console.log("El valor que toma puede estar expresado mediante la notación de CSS. La propiedad strokeStyle, establece el color");
console.log("que se usará para pintar el borde de una figura. La propiedad lineWidth, define el ancho del borde de una figura.");

//En español, y en este contexto, stroke significa trazo

let linesSurfaces = document.getElementById("linesAndSurfaces");
let context = linesSurfaces.getContext("2d");
context.strokeStyle = "blue";
context.strokeRect(5,5,50,50);
context.lineWidth = 5;
context.strokeRect(135, 5, 50, 50);

console.log();

console.log("Un path es una secuencia de líneas.");

let paths = document.getElementById("paths").getContext("2d");
paths.beginPath();
for (let y = 10; y < 100; y += 10) {
	paths.moveTo(10, y);
	paths.lineTo(90, y);
}
paths.stroke();

console.log("La función de arriba dibuja varias líneas paralelas. El método moveTo establece las coordenadas desde donde empieza a");
console.log("dibujar. El método lineTo dibuja la línea, desde las coordenadas de moveTo hasta las coordenadas que se les pasa como");
console.log("argumentos. Finalmente el método stroke establece un trazo para las líneas.");

console.log();

console.log("Se puede crear una figura cerrada a partir de líneas. Pero para rellenarla el origen y el final del camino debe");
console.log("coincidir.")

let closed = document.getElementById("closed").getContext("2d");
closed.beginPath();
closed.moveTo(50, 10);
closed.lineTo(10, 70);
closed.lineTo(90, 70);
closed.fill();

console.log();

console.log("Un camino también puede contener curvas, pero son más complicadas de dibujar. El método quadraticCurveTo dibuja");
console.log("una curva en un punto dado. Para determinar la curvatura de la línea, al método se le asigna un punto de");
console.log("control, que atrae la línea y la curva, y un punto de destino.");

let quadCurve = document.getElementById("quadCurve").getContext("2d");
quadCurve.beginPath();
quadCurve.moveTo(10, 90);
// control=(60, 10) goal=(90,90)
quadCurve.quadraticCurveTo(60, 10, 90, 90);
quadCurve.lineTo(60, 10);
quadCurve.closePath();
quadCurve.stroke();

console.log();

console.log("El método bezierCurveTo dibuja un tipo de curva similar, pero en vez de tener un único punto de control,");
console.log("tiene dos, uno para cada uno de los puntos finales de la línea.");

let bezier = document.getElementById("bezier").getContext("2d");
bezier.beginPath();
bezier.moveTo(10, 90);
//control1=(10,10) control2=(90,10) goal=(50,90)
bezier.bezierCurveTo(10, 10, 90, 10, 50, 90);
bezier.lineTo(90, 10);
bezier.lineTo(10, 10);
bezier.closePath();
bezier.stroke();

console.log();

console.log("El método arc es una forma de dibujar una línea que se curva a lo largo del borde de un círculo. Necesita");
console.log("un par de coordenadas para definir el centro, un radio y un ángulo inicial y otro final. Los ángulos se");
console.log("en radianes, no en grados, esto significa que un círculo completo tiene un ángulo final de 2 pi radianes.");

let circulo = document.getElementById("circulo").getContext("2d");
circulo.beginPath();
//center=(50, 50) radius = 40 angle = 0 to 7
circulo.arc(50, 50, 40, 0, 7);
//center=(150, 50) radius = 40 angle = 0 to pi/2
circulo.arc(150, 50, 40, 0, 0.5 * Math.PI);
circulo.stroke();

console.log();

console.log("Drawning a pie chart");

const results = [
	{name: "Satisfied", count: 1043, color: "lightblue"},
	{name: "Neutral", count: 563, color: "lightgreen"},
	{name: "Unsatisfied", count: 510, color: "pink"},
	{name: "No comment", count: 175, color: "silver"}
];

let pie = document.getElementById("pie").getContext("2d");
let total = results.reduce((sum, {count}) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
for (let result of results) {
	let sliceAngle = (result.count / total) * 2 * Math.PI;
	pie.beginPath();
	//center=100, 100, radius = 100
	//from current angle, clockwise by slice's angle
	pie.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
	currentAngle += sliceAngle;
	pie.lineTo(100, 100);
	pie.fillStyle = result.color;
	pie.fill();
}

console.log();

console.log("Text");

let texto = document.getElementById("texto").getContext("2d");
texto.font = "italic 28px Georgia";
texto.fillStyle = "fuchsia";
texto.fillText("I can draw text, too!", 10, 50);

console.log("Podemos especificar tamaño, estilo y fuente mediante la propiedad font. Los dos últimos argumentos de fillText y strokeText");
console.log("establecen la posición en la que se dibuja la fuente. Podemos cambiar la posición horizontal mediante la propiedad");
console.log("textAlign y sus valores 'end' o 'center' y la vertical mediante textBaseline y su valores 'top', 'middle' o 'bottom'.");

console.log();

console.log("Existen dos tipos de gráficos generados por ordenador: vectoriales y mapa de bits. El primero consiste en especificar una");
console.log("imagen dando una descripción lógica de formas. El segundo, no especifica formas reales sino que funciona con datos de");
console.log("píxeles (tramas de puntos de colores). El método drawImage nos permite dibujar datos de píxeles en un lienzo. Estos datos");
console.log("de píxeles pueden tener su origen en un elemento <img> o en otro lienzo.");

let images = document.getElementById("images").getContext("2d");
let img = document.createElement("img");
img.src = "hat.jpg";
//document.body.appendChild(img);
img.addEventListener("load", () => {
	//Parámetros: imagen, x, y, width, height
	images.drawImage(img, 100, 100, 200, 250, 20, 20, 150, 150);
});

console.log("Los cuatro primeros argumentos después de img, especifican la porción de la imagen que queremos ver definiendo un");
console.log("cuadrado. El resto de argumentos, especifican las dimensiones de la porción de la imagen.");
console.log("Más información en: https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage");

console.log();

console.log("El método drawImage es útil si queremos empaquetar múltiples sprites (elementos de imagen) en un solo archivo de");
console.log("de imagen y luego dibujamos solo la parte que necesitemos e.g. podemos crear una animación");

let anima = document.getElementById("anima").getContext("2d");
let imgAnima = document.createElement("img");
imgAnima.src = "player.png";
let spriteW = 24;
let spriteH = 30;
imgAnima.addEventListener("load", () => {
	let cycle = 0;
	setInterval(() => {
		anima.clearRect(0, 0, spriteW, spriteH);
		anima.drawImage(imgAnima, cycle * spriteW, 0, spriteW, spriteH, 0, 0, spriteW, spriteH);
		cycle = (cycle + 1) % 8;
	}, 120);
});

console.log("El método scale permite definir el escalado de una figura. Toma dos parámetros, uno que establece el escalado vertical");
console.log("y otro que establece el escalado horizontal.");

let escalado = document.getElementById("escalado").getContext("2d");
escalado.scale(3, .5);
escalado.beginPath();
escalado.arc(50, 50, 40, 0, 7);
escalado.lineWidth = 3; //Define el grosor de la línea en píxeles
escalado.stroke();

console.log("El escalado en una cantidad negativa también puede cambiar la imagen. El cambio ocurre alrededor del punto (0,0) lo");
console.log("significa que también cambiará la dirección del sistema de coordenadas. Entonces, para darle la vuelta a una imagen");
console.log("no podemos simplemente agregar scale(-1,1) antes de la llamada a drawImage porque eso movería nuestra imagen fuera");
console.log("del lienzo, y no sería visible. Podemos ajustar las coordenadas dadas a drawImage para compensar esto, dibujando la");
console.log("imagen en la posición -50 en lugar de 0. Otra solución es ajustar el eje alrededor del escalado.");
console.log("Hay otros métodos además de scale que influyen en el sistema de coordenadas del lienzo. Podemos rotar figuras con");
console.log("el método rotate y moverlas con el método translate. Todas estas transformaciones se apilan, lo que significa que");
console.log("cada una ocurre en relación con las transformaciones anteriores. Esquema página 296.");
console.log("Para girar una imagen alrededor de la línea vertical en una posición dada, podemos hacer lo siguiente:");

function flipHorizontally(context, around) {
	context.translate(around, 0);
	context.scale(-1, 1);
	context.translate(-around, 0);
}

console.log("Movemos el eje y hacia donde queremos que esté nuestro espejo, aplicamos el reflejo y finalmente el eje y regresa a");
console.log("a un lugar apropiado. Esquema página 296.");
console.log("Ahora podemos dibujar un personaje reflejado en la posición (100, 0) girando el mundo alrededor de su centro vertical");

let espejo = document.getElementById("espejo").getContext("2d");
let imgEspejo = document.createElement("img");
imgEspejo.src = "player.png";
let spriteWespejo = 24;
let spriteHespejo = 30;
imgEspejo.addEventListener("load", () => {
	flipHorizontally(espejo, 100 + spriteWespejo / 2);
	espejo.drawImage(imgEspejo, 0, 0, spriteWespejo, spriteHespejo, 100, 0, spriteWespejo, spriteHespejo);
});

console.log();

console.log("Es posible guardar la transformación actual, dibujar y transformar, y luego restaurar la transformación anterior. Los");
console.log("métodos save y restore gestionan estas transformaciones en el contexto del lienzo 2d. Conceptualmente mantienen una");
console.log("pila de estados de transformación. Cuando se llama a save, el estado actual se inserta en la pila, y cuando se llama");
console.log("a restore, se quita el estado de la parte superior de la pila y se usa como la transformación actual del contexto.");
console.log("E.g. la función branch (bifurcación) dibuja un fractal usando los métodos save y restore.");

let fractal = document.getElementById("fractal").getContext("2d");
function branch(length, angle, scale) {
	fractal.fillRect(0, 0, 1, length);
	if (length < 8) return;
	fractal.save();
	fractal.translate(0, length);
	fractal.rotate(-angle);
	branch(length * scale, angle, scale);
	fractal.rotate(2 * angle);
	branch(length * scale, angle, scale);
	fractal.restore();
}

fractal.translate(300, 0);
branch(60, 0.5, 0.8);

console.log("Abrimos un paréntesis para volver al juego y hacer que el display use el método drawImage para dibujar imágenes");
console.log("que representen los elementos del juego.");

console.log();

console.log("Shapes");

function trapezoid(x, y) {
	let ctx = document.getElementById("trapezoid").getContext("2d");
	ctx.moveTo(20, 0);
	ctx.lineTo(x - 20, 0);
	ctx.lineTo(x + 20, y);
	ctx.lineTo(0, y);
	ctx.lineTo(20, 0);
	ctx.stroke();
};

trapezoid(150, 50);

function diamond(x, y) {
	let ctx = document.getElementById("diamond").getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.translate(x + 30, y + 30);
	ctx.rotate(Math.PI / 4);
	ctx.fillRect(-30, -30, x, y);
	ctx.fill();
	ctx.closePath();
};

diamond(50, 50);

function zigzag(x, y) {
	let ctx = document.getElementById("zigzag").getContext("2d");
	ctx.moveTo(0, 0);
	let right = true;
	for (let i = 10; i <= y; i += 10) {
		if (right) ctx.lineTo(x, i);
		else ctx.lineTo(0, i);
		right = !right;
		ctx.stroke();
	}
};

zigzag(100, 100);

console.log("Look at exercise solutions: https://eloquentjavascript.net/code/#17");

