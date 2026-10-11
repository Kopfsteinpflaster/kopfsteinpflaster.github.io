document.addEventListener('DOMContentLoaded', function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.carousel').forEach(function (carousel) {
        var track = carousel.querySelector('.carousel-track');
        if (!track) return;

        var items = track.children;
        var prevButtons = carousel.querySelectorAll('[data-carousel-prev]');
        var nextButtons = carousel.querySelectorAll('[data-carousel-next]');
        var dotGroups = carousel.querySelectorAll('.carousel-dots');
        var counters = carousel.querySelectorAll('.carousel-count');
        var pageCount = 1;
        var ticking = false;

        function gap() {
            return parseFloat(getComputedStyle(track).columnGap) || 0;
        }

        function perView() {
            if (!items.length) return 1;
            var step = items[0].getBoundingClientRect().width + gap();
            return Math.max(1, Math.floor((track.clientWidth + gap()) / step + 0.01));
        }

        function itemLeft(index) {
            return items[index].offsetLeft - items[0].offsetLeft;
        }

        function currentPage() {
            var maxScroll = track.scrollWidth - track.clientWidth;
            if (track.scrollLeft >= maxScroll - 2) return pageCount - 1;
            var nearest = 0;
            for (var i = 1; i < items.length; i++) {
                if (Math.abs(itemLeft(i) - track.scrollLeft) < Math.abs(itemLeft(nearest) - track.scrollLeft)) {
                    nearest = i;
                }
            }
            return Math.min(pageCount - 1, Math.round(nearest / perView()));
        }

        function goTo(page) {
            var index = Math.min(items.length - 1, page * perView());
            track.scrollTo({
                left: itemLeft(index),
                behavior: reduceMotion ? 'auto' : 'smooth'
            });
        }

        function buildDots() {
            pageCount = Math.max(1, Math.ceil(items.length / perView()));
            dotGroups.forEach(function (group) {
                group.innerHTML = '';
                for (var i = 0; i < pageCount; i++) {
                    var dot = document.createElement('button');
                    dot.type = 'button';
                    dot.setAttribute('aria-label', 'Seite ' + (i + 1));
                    dot.addEventListener('click', goTo.bind(null, i));
                    group.appendChild(dot);
                }
            });
            update();
        }

        function update() {
            ticking = false;
            var page = currentPage();
            dotGroups.forEach(function (group) {
                Array.prototype.forEach.call(group.children, function (dot, i) {
                    var active = i === page;
                    dot.classList.toggle('active', active);
                    if (active) {
                        dot.setAttribute('aria-current', 'true');
                    } else {
                        dot.removeAttribute('aria-current');
                    }
                });
            });
            counters.forEach(function (counter) {
                counter.textContent = (page + 1) + ' / ' + pageCount;
            });
        }

        prevButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // vor der ersten Seite geht es mit der letzten weiter
                goTo((currentPage() - 1 + pageCount) % pageCount);
            });
        });
        nextButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // nach der letzten Seite geht es mit der ersten weiter
                goTo((currentPage() + 1) % pageCount);
            });
        });

        track.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        });

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(buildDots, 150);
        });

        buildDots();
    });
});
