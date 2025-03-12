// 使用 IIFE 封装作用域
(() => {
    /* 加载动画处理 */
    const handleLoaderTransition = () => {
        const loader = document.getElementById("loading-warp");
        const onTransitionEnd = () => (loader.style.display = "none");
        
        loader.classList.add("loading-animations-out");
        loader.addEventListener('transitionend', onTransitionEnd, { once: true });
    };

    /* 页面导航系统 */
    const initNavigation = () => {
        const mainElements = [
            '.Ayou_avatar', '.Ayou_title', '.Ayou_des', 
            '.Ayou_nav_a', '.Ayou_nav_b', '.Ayou_footer'
        ].join(',');
        
        const toggleVisibility = (showMain = false) => {
            const method = showMain ? 'removeClass' : 'addClass';
            $(mainElements)[method]('Ayou_hidden');
            //$('#back-button').toggleClass('Ayou_hidden', !showMain);
            $('.Ayou_right > [id$="-content"]').addClass('Ayou_hidden');
        };

        $(document)
            .on('click', '.nav-link', e => {
                e.preventDefault();
                const target = $(e.currentTarget).data('target');
                toggleVisibility();
                if (target) $(`#${target}-content`).removeClass('Ayou_hidden');
            })
            .on('click', '#back-button', () => toggleVisibility(true));
    };

    /* 主题管理系统 */
    const initTheme = () => {
        const storageKey = 'theme';
        const theme = {
            current: localStorage.getItem(storageKey) || 'light',
            elements: {
                toggle: document.querySelector('#switch_default, .toggleBtn'),
                body: document.body
            },
            
            apply: function() {
                const isDark = this.current === 'dark';
                this.elements.body.classList.toggle('dark-theme', isDark);
                if (this.elements.toggle) this.elements.toggle.checked = isDark;
            },
            
            toggle: function() {
                this.current = this.current === 'dark' ? 'light' : 'dark';
                localStorage.setItem(storageKey, this.current);
                this.apply();
            },
            
            watchSystem: function() {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const handler = e => {
                    if (!localStorage.getItem(storageKey)) {
                        this.current = e.matches ? 'dark' : 'light';
                        this.apply();
                    }
                };
                mediaQuery.addEventListener('change', handler);
            }
        };

        if (!localStorage.getItem(storageKey)) {
            const hours = new Date().getHours();
            theme.current = hours >= 18 || hours < 7 ? 'dark' : 'light';
        }

        theme.apply();
        theme.watchSystem();
        if (theme.elements.toggle) {
            theme.elements.toggle.addEventListener('click', () => theme.toggle());
        }
    };

    /* 控制台美化 */
    const initConsole = () => {
        const style = [
            'color:#fff;background:linear-gradient(90deg,#448bff,#44e9ff);',
            'padding:5px 0;'
        ].join('');
        
        console.log(
            `%c ${document.title} %c ${location.hostname}`,
            style,
            'background:linear-gradient(90deg,#44e9ff,#fff);padding:5px 10px 5px 0;'
        );
    };


    /* 初始化入口 */
    window.addEventListener('load', () => {
        handleLoaderTransition();
        initNavigation();
        initTheme();
        initConsole();
    });
})();