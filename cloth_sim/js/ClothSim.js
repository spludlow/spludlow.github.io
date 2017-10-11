//create damping and spring force coefficients
var KD = 0.03;
var KS = 0.05;
//set mass and initial restlength of the cloth particles
var MASS = 0.1;
var restLength = 20;
//set gravitational force
var GRAVITY = -9.81 * 1.4;
var gravityForce = new THREE.Vector3(0, GRAVITY, 0 ).multiplyScalar( MASS);
//segments of the cloth/plane
var xSegs = 10;
var ySegs = 10;
//initial timestep
var TIMESTEP = 18/100;
var simTimeStep = TIMESTEP * TIMESTEP;
//check if first step
var prevTime;
//wind force
var wind = false;
var windStrength = 2;
var windForce = new THREE.Vector3( 0, 0, 0.01 ).multiplyScalar(MASS);
var tmpForce = new THREE.Vector3();

var pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15];

/* function for the ParametricGeometry of the cloth*/
function plane( width, height ) {

    return function ( u, v) {

        var x = ( u - 0.5 ) * width;
        var y = ( v + 0.5 ) * height;
        var z = 0;

        return new THREE.Vector3( x, y, z);
    }
}

var clothFunction = plane(restLength * xSegs, restLength * ySegs);

//the cloth is made up of mass points at each segment
function MassPoint( x, y, z, mass) {

    this.position = clothFunction( x, y );// position
    this.original = clothFunction( x, y );// original position
    this.v = new THREE.Vector3( 0, 0, 0 );// velocity
    this.mass = mass;
    this.structural = [];//store structural springs
    this.shear = [];//store shear springs\
}

//Euler Integration
MassPoint.prototype.integrate = function(simTime) {

    var forceTotal = new THREE.Vector3();
    forceTotal.add(gravityForce);
    forceTotal.add(windForce);
    //var windForce = new THREE.Vector3(0, 0, Math.cos(simTime / 1000)).multiplyScalar(this.mass);
    //forceTotal.add(windForce);
    var otherPoint;

    //for each structural spring
    structLen = this.structural.length;
    for ( i = 0; i < structLen; i ++) {
        fs = new THREE.Vector3();
        fd = new THREE.Vector3().copy(this.v);

        otherPoint = this.structural[i];
        //compute spring length
        curLength = this.position.distanceTo(otherPoint.position);
        //compute the spring force fs
        fs.setX((this.position.x - otherPoint.position.x)/curLength);
        fs.setY((this.position.y - otherPoint.position.y)/curLength);
        fs.setZ((this.position.z - otherPoint.position.z)/curLength);
        fs.multiplyScalar(KS);
        fs.multiplyScalar(curLength-restLength);

        //compute damping  force fd
        fd.multiplyScalar(-KD);

        forceTotal.add(fs).add(fd);
    }
    //for each shear spring 
    var diagonalLength = Math.sqrt(restLength * restLength);
    shearLen = this.shear.length;
    // for ( i = 0; i < shearLen; i ++) {
    //     fs = new THREE.Vector3();
    //     fd = new THREE.Vector3().copy(this.v);

    //     otherPoint = this.shear[i];
    //     //compute spring length
    //     curLength = this.position.distanceTo(otherPoint.position);
    //     if ( curLength == 0) return;
    //     //compute the spring force fs
    //     fs.subVectors(this.position, otherPoint.position).divideScalar(curLength);
    //     fs.multiplyScalar(KS).multiplyScalar(curLength-diagonalLength);

    //     //compute damping  force fd
    //     fd.multiplyScalar(-KD);

    //     forceTotal.add(fs).add(fd);//.add(this.wind.multiplyScalar(1/this.mass));
    // }
    //update position x
    var newPos = new THREE.Vector3().copy(this.v).multiplyScalar(simTime).add(this.position);
    this.position = newPos;

    //update velocity
    var newV = forceTotal.multiplyScalar(simTime).divideScalar(this.mass).add(this.v);
    this.v = newV;
}

function Cloth( w, h) {

    w = w || 10;
    h = h || 10;
    this.w = w;
    this.h = h;

    var particles = [];

    var u, v;

    //create particles
    for (v = 0; v <= h; v++ ) {
        for (u = 0; u <= w; u++ ) {

            particles.push(
                new MassPoint(u/w, v/h, 0, MASS)
            );
            
        }
    }

    //structural springs
    for ( v= 0; v < h; v++) {
        for ( u = 0; u < w; u++) {
            particles[index(u,v)].structural.push(
                particles[index(u,v+1)]
            );
            particles[index(u,v+1)].structural.push(
                 particles[index(u,v)]
            );
            particles[index(u,v)].structural.push(
                particles[index(u+1,v)]
            );
            particles[index(u+1,v)].structural.push(
                particles[index(u,v)]
            );
        }
    }

    //structural springs along far edge
	for ( u = w, v = 0; v < h; v ++ ) {

		particles[index(u,v)].structural.push(
            particles[index(u,v+1)]
        );
        particles[index(u,v+1)].structural.push(
            particles[index(u,v)]
        );
	}

    //structural springs along bottom
    for ( v = h, u = 0; u < w; u ++ ) {

		particles[index(u,v)].structural.push(
            particles[index(u+1,v)]
        );
        particles[index(u+1,v)].structural.push(
            particles[index(u,v)]
        );
	}

    //Shear springs
    for ( v = 0; v < h; v++) {
        for ( u = 0; u < w; u++) {
            particles[index(u,v)].shear.push(
                particles[index(u+1,v+1)]
            );
            particles[index(u+1,v+1)].shear.push(
                particles[index(u,v)]
            );
            particles[index(u+1,v)].shear.push(
                particles[index(u,v+1)]
            );
            particles[index(u,v+1)].shear.push(
                particles[index(u+1,v)]
            );
        }
    }

    this.particles = particles;
    console.log(particles[60]);
    
    //find index based on u, v
    function index(u,v) {
        return u + v * (w + 1);
    }
    this.index = index;
}

var cloth = new Cloth ( xSegs, ySegs);
var pins = [ 0, cloth.w];

function simulate( time ) {
    if ( ! prevTime ) {
        prevTime = time;
        return;
    }

    var i, il, particles, particle;

	for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {

		particle = particles[ i ];

		particle.integrate( simTimeStep );

	}

    // Floor Constraints

	for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {

		particle = particles[ i ];
		pos = particle.position;
		if ( pos.y < - 250 ) {

			pos.y = - 250;

		}

	}

	// Pin Constraints

	for ( i = 0, il = pins.length; i < il; i ++ ) {

		var xy = pins[ i ];
		var p = particles[ xy ];
		p.position.copy( p.original );

	}
}
