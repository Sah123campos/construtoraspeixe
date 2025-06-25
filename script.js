document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Menu Mobile
    // =============================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // =============================================
    // Carrossel de Empreendimentos
    // =============================================
    let currentSlide = 0;
    const carrosselItems = document.querySelectorAll('.carrossel-item');
    const carrosselTrack = document.querySelector('.carrossel-track');
    const prevBtn = document.querySelector('.carrossel-prev');
    const nextBtn = document.querySelector('.carrossel-next');
    
    function updateCarrossel() {
        const itemWidth = carrosselItems[0].offsetWidth;
        const containerWidth = document.querySelector('.carrossel-container').offsetWidth;
        const totalWidth = carrosselItems.length * itemWidth;
        let offset = -currentSlide * itemWidth;
        // Limitar o offset para não passar do último card
        const maxOffset = containerWidth - totalWidth;
        if (offset < maxOffset) {
            offset = maxOffset;
        }
        carrosselTrack.style.transform = `translateX(${offset}px)`;
    }
    
    function nextSlide() {
        if (currentSlide < carrosselItems.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateCarrossel();
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = carrosselItems.length - 1;
        }
        updateCarrossel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Rotação automática
    setInterval(() => {
        nextSlide();
    }, 6000);
    
    // Ajustar carrossel ao redimensionar
    window.addEventListener('resize', updateCarrossel);
    
    // Inicializar carrossel
    updateCarrossel();
    
    // =============================================
    // Animação de Números (Sobre Nós)
    // =============================================
    const numeroElements = document.querySelectorAll('.numero');
    
    function animateNumbers() {
        numeroElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Ativar animação quando a seção for visível
    const sobreSection = document.querySelector('.sobre-nos');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(sobreSection);
    
    // =============================================
    // Scroll Suave para Âncoras
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // Efeito de Header ao Scroll
    // =============================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // =============================================
    // Ativar Tooltips (se necessário)
    // =============================================
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 40}px`;
            
            document.body.appendChild(tooltip);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            });
        });
    });
    
    // =============================================
    // Modal de Galeria de Imagens por Grupo
    // =============================================
    const modal = document.getElementById('modal-fullscreen');
    const modalImg = document.querySelector('.modal-img');
    const modalClose = document.querySelector('.modal-close');

    // Definir grupos de imagens
    const imageGroups = {
        empreendimento1: ['imagem1a.jpeg', 'imagem1b.jpeg', 'imagem1c.jpeg', 'imagem1d.jpeg', 'imagem1e.jpeg', 'imagem1f.jpeg'],
        empreendimento2: ['imagem2a.jpeg', 'imagem2b.jpeg', 'imagem2c.jpeg', 'imagem2d.jpeg', 'imagem2e.jpeg', 'imagem2f.jpeg', 'imagem2g.jpeg', 'imagem2h.jpeg'],
        empreendimento3: ['imagem3a.jpeg', 'imagem3b.jpeg', 'imagem3c.jpeg', 'imagem3d.jpeg', 'imagem3e.jpeg', 'imagem3f.jpeg', 'imagem3g.jpeg'],
        empreendimento4: ['imagem4a.jpeg', 'imagem4b.jpeg', 'imagem4c.jpeg', 'imagem4d.jpeg', 'imagem4e.jpeg', 'imagem4f.jpeg', 'imagem4g.jpeg'],
        empreendimento5: ['imagem5a.jpeg', 'imagem5b.jpeg', 'imagem5c.jpeg', 'imagem5d.jpeg', 'imagem5e.jpeg', 'imagem5f.jpeg'],
        empreendimento6: ['imagem6a.jpeg', 'imagem6b.jpeg', 'imagem6c.jpeg', 'imagem6d.jpeg', 'imagem6e.jpeg', 'imagem6f.jpeg', 'imagem6g.jpeg', 'imagem6h.jpeg', 'imagem6i.jpeg', 'imagem6j.jpeg', 'imagem6k.jpeg', 'imagem6l.jpeg', 'imagem6m.jpeg', 'imagem6n.jpeg', 'imagem6o.jpeg', 'imagem6p.jpeg', 'imagem6q.jpeg', 'imagem6r.jpeg']
    };

    let currentImageIndex = 0;
    let currentGroup = null;

    // Abrir modal ao clicar no botão "Veja mais sobre"
    const fullscreenBtns = document.querySelectorAll('.btn-fullscreen');
    fullscreenBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const group = this.getAttribute('data-group');
            const clickedImg = this.getAttribute('data-img');
            
            currentGroup = group;
            currentImageIndex = imageGroups[group].indexOf(clickedImg);
            
            // Criar galeria no modal
            createGalleryModal(group);
            modal.classList.add('open');
            document.body.classList.add('modal-open');
        });
    });

    function createGalleryModal(group) {
        const images = imageGroups[group];
        
        // Limpar modal
        modal.innerHTML = `
            <span class="modal-close">&times;</span>
            <div class="gallery-container">
                <div class="gallery-main">
                    <img class="modal-img" src="${images[currentImageIndex]}" alt="Imagem ${currentImageIndex + 1}">
                </div>
                <div class="gallery-thumbnails">
                    ${images.map((img, index) => `
                        <div class="thumbnail ${index === currentImageIndex ? 'active' : ''}" data-index="${index}">
                            <img src="${img}" alt="Miniatura ${index + 1}">
                        </div>
                    `).join('')}
                </div>
                <div class="gallery-nav">
                    <button class="gallery-prev" aria-label="Anterior">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <span class="gallery-counter">${currentImageIndex + 1} / ${images.length}</span>
                    <button class="gallery-next" aria-label="Próximo">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;

        // Adicionar event listeners
        const modalClose = modal.querySelector('.modal-close');
        const thumbnails = modal.querySelectorAll('.thumbnail');
        const prevBtn = modal.querySelector('.gallery-prev');
        const nextBtn = modal.querySelector('.gallery-next');

        modalClose.addEventListener('click', closeModal);
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showImage(index);
            });
        });

        prevBtn.addEventListener('click', () => {
            const newIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = (currentImageIndex + 1) % images.length;
            showImage(newIndex);
        });

        // Navegação com teclado
        document.addEventListener('keydown', handleKeyPress);
    }

    function showImage(index) {
        const images = imageGroups[currentGroup];
        currentImageIndex = index;
        
        const modalImg = modal.querySelector('.modal-img');
        const counter = modal.querySelector('.gallery-counter');
        const thumbnails = modal.querySelectorAll('.thumbnail');
        
        modalImg.src = images[index];
        counter.textContent = `${index + 1} / ${images.length}`;
        
        // Atualizar thumbnails ativos
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    function handleKeyPress(e) {
        if (!modal.classList.contains('open')) return;
        
        const images = imageGroups[currentGroup];
        
        switch(e.key) {
            case 'ArrowLeft':
                const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
                showImage(prevIndex);
                break;
            case 'ArrowRight':
                const nextIndex = (currentImageIndex + 1) % images.length;
                showImage(nextIndex);
                break;
            case 'Escape':
                closeModal();
                break;
        }
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleKeyPress);
    }

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // =============================================
    // Carrossel de Imagens de Fundo do Hero Banner
    // =============================================
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner) {
        const backgroundImagesData = heroBanner.getAttribute('data-background-images');
        const backgroundImages = backgroundImagesData ? backgroundImagesData.split(',') : [];
        let currentImageIndexHero = 0;

        function updateHeroBackground() {
            if (backgroundImages.length === 0) return;
            const imageUrl = backgroundImages[currentImageIndexHero];
            heroBanner.style.backgroundImage = `url('${imageUrl}')`;
            currentImageIndexHero = (currentImageIndexHero + 1) % backgroundImages.length;
        }

        // Inicializa a primeira imagem
        updateHeroBackground();

        // Troca a imagem a cada 4 segundos
        setInterval(updateHeroBackground, 4000);
    }
});