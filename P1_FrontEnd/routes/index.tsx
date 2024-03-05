const Home = () => {
    return (
        <main>
            <div class="indexmain">
                <h1 class="saludar">Bienvenido</h1>
                <div class="menu-container">  {}
                    <h2 class="menuindex">Menu de opciones:</h2>
                    <div class="menu">  {}
                        <a href="/airport" class="menu-item">Aeropuertos</a>
                        <a href="/jokes" class="menu-item">Chistes</a>
                        <a href="/recipe" class="menu-item">Recetas</a>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;
