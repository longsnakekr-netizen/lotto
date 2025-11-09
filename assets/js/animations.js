/**
 * GSAP 기반 애니메이션 및 인터랙션 스크립트
 * GSAP 3.12 + ScrollTrigger 사용
 */

(function($) {
  'use strict';

  // GSAP 플러그인 등록
  gsap.registerPlugin(ScrollTrigger);

  /**
   * 히어로 슬라이더 (GSAP 기반)
   */
  window.HeroSlider = {
    currentSlide: 0,
    totalSlides: 0,
    autoPlayInterval: null,
    autoPlayDelay: 3000,
    isAnimating: false,

    /**
     * 슬라이더 초기화
     * @param {string} containerSelector - 슬라이더 컨테이너 선택자
     * @param {Object} options - 옵션 (autoPlay, delay 등)
     */
    init: function(containerSelector, options = {}) {
      this.container = $(containerSelector);
      this.slides = this.container.find('.slide');
      this.totalSlides = this.slides.length;

      if (this.totalSlides === 0) return;

      // 옵션 설정
      this.autoPlayDelay = options.delay || 3000;
      const autoPlay = options.autoPlay !== false;

      // 인디케이터 생성
      this.createIndicators();

      // 화살표 버튼 이벤트
      this.setupNavigation();

      // 첫 번째 슬라이드를 애니메이션과 함께 표시
      this.slides.hide().css('opacity', 0);
      gsap.to(this.slides[0], {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        onStart: () => {
          $(this.slides[0]).show();
        }
      });
      this.currentSlide = 0;
      this.updateIndicators();

      // 자동 재생
      if (autoPlay) {
        this.startAutoPlay();

        // 마우스 호버 시 자동 재생 일시 정지
        this.container.hover(
          () => this.stopAutoPlay(),
          () => this.startAutoPlay()
        );
      }
    },

    /**
     * 인디케이터(dots) 생성
     */
    createIndicators: function() {
      const indicatorsContainer = this.container.find('.slider-indicators');
      if (indicatorsContainer.length === 0) return;

      indicatorsContainer.empty();

      for (let i = 0; i < this.totalSlides; i++) {
        const dot = $('<button>')
          .addClass('slider-dot')
          .attr('data-slide', i)
          .on('click', (e) => {
            if (this.isAnimating) return;
            this.showSlide(i);
            this.stopAutoPlay();
            this.startAutoPlay();
          });

        indicatorsContainer.append(dot);
      }
    },

    /**
     * 네비게이션(화살표) 설정
     */
    setupNavigation: function() {
      const prevBtn = this.container.find('.slider-prev');
      const nextBtn = this.container.find('.slider-next');

      prevBtn.on('click', () => {
        if (this.isAnimating) return;
        this.prevSlide();
        this.stopAutoPlay();
        this.startAutoPlay();
      });

      nextBtn.on('click', () => {
        if (this.isAnimating) return;
        this.nextSlide();
        this.stopAutoPlay();
        this.startAutoPlay();
      });
    },

    /**
     * 슬라이드 표시 (GSAP 애니메이션)
     * @param {number} index - 슬라이드 인덱스
     * @param {boolean} animate - 애니메이션 여부 (기본 true)
     */
    showSlide: function(index, animate = true) {
      if (this.isAnimating) return;

      const oldSlide = this.slides[this.currentSlide];
      const newSlide = this.slides[index];

      this.currentSlide = index;
      this.updateIndicators();

      if (!animate) {
        // 초기 표시 (애니메이션 없이)
        $(this.slides).hide().css('opacity', 0);
        $(newSlide).show().css('opacity', 1);
        return;
      }

      // GSAP 타임라인으로 슬라이드 전환
      this.isAnimating = true;

      const tl = gsap.timeline({
        onComplete: () => {
          this.isAnimating = false;
        }
      });

      // 이전 슬라이드 페이드 아웃
      tl.to(oldSlide, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      // 새 슬라이드 표시 및 페이드 인
      tl.set(newSlide, { display: 'block', opacity: 0 });
      tl.to(newSlide, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      // 이전 슬라이드 숨김
      tl.set(oldSlide, { display: 'none' });
    },

    /**
     * 인디케이터 업데이트
     */
    updateIndicators: function() {
      const dots = this.container.find('.slider-dot');

      // GSAP으로 인디케이터 애니메이션
      dots.each((i, dot) => {
        if (i === this.currentSlide) {
          gsap.to(dot, {
            width: 32,
            duration: 0.3,
            ease: 'power2.out'
          });
          $(dot).addClass('active');
        } else {
          gsap.to(dot, {
            width: 12,
            duration: 0.3,
            ease: 'power2.out'
          });
          $(dot).removeClass('active');
        }
      });
    },

    /**
     * 다음 슬라이드
     */
    nextSlide: function() {
      const nextIndex = (this.currentSlide + 1) % this.totalSlides;
      this.showSlide(nextIndex);
    },

    /**
     * 이전 슬라이드
     */
    prevSlide: function() {
      const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
      this.showSlide(prevIndex);
    },

    /**
     * 자동 재생 시작
     */
    startAutoPlay: function() {
      this.stopAutoPlay();
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayDelay);
    },

    /**
     * 자동 재생 정지
     */
    stopAutoPlay: function() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  };

  /**
   * 스크롤 애니메이션 (ScrollTrigger 사용)
   */
  window.ScrollAnimations = {
    /**
     * 초기화 - 스크롤 시 요소 등장 애니메이션
     */
    init: function() {
      // .animate-on-scroll 클래스를 가진 요소들
      const elements = document.querySelectorAll('.animate-on-scroll');

      elements.forEach((element, index) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
            // markers: true, // 디버깅용
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1 // 순차적으로 등장
        });
      });
    },

    /**
     * 페이드 업 애니메이션
     * @param {string} selector - 대상 선택자
     */
    fadeUp: function(selector) {
      gsap.from(selector, {
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out'
      });
    },

    /**
     * 스케일 업 애니메이션
     * @param {string} selector - 대상 선택자
     */
    scaleUp: function(selector) {
      gsap.from(selector, {
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    },

    /**
     * 좌우에서 슬라이드 인 애니메이션
     * @param {string} selector - 대상 선택자
     * @param {string} direction - 'left' 또는 'right'
     */
    slideIn: function(selector, direction = 'left') {
      const x = direction === 'left' ? -100 : 100;

      gsap.from(selector, {
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: x,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }
  };

  /**
   * 부드러운 스크롤 (GSAP 사용)
   */
  window.SmoothScroll = {
    init: function() {
      $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));

        if (target.length) {
          e.preventDefault();

          // GSAP으로 부드러운 스크롤
          gsap.to(window, {
            duration: 0.8,
            scrollTo: {
              y: target.offset().top - 80, // 헤더 높이 고려
              autoKill: true
            },
            ease: 'power2.inOut'
          });
        }
      });
    }
  };

  /**
   * 탭 전환 (GSAP 애니메이션)
   */
  window.TabSwitcher = {
    init: function(containerSelector) {
      const container = $(containerSelector);
      const tabs = container.find('.tab-button');
      const contents = container.find('.tab-content');

      tabs.on('click', function() {
        const targetId = $(this).data('tab');
        const targetContent = $(`#${targetId}`);

        if (targetContent.hasClass('active')) return;

        // 모든 탭 비활성화
        tabs.removeClass('active');
        $(this).addClass('active');

        // 현재 활성 컨텐츠 페이드 아웃
        const currentContent = contents.filter('.active');

        gsap.to(currentContent[0], {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            currentContent.removeClass('active').hide();

            // 새 컨텐츠 페이드 인
            targetContent.show().addClass('active');
            gsap.fromTo(targetContent[0],
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
          }
        });
      });

      // 첫 번째 탭 활성화
      if (tabs.length > 0) {
        $(tabs[0]).trigger('click');
      }
    }
  };

  /**
   * 모달 핸들러 (GSAP 애니메이션)
   */
  window.Modal = {
    open: function(modalId) {
      const modal = $(`#${modalId}`);
      modal.show().addClass('active');
      $('body').css('overflow', 'hidden');

      // GSAP 애니메이션
      gsap.fromTo(modal[0],
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    },

    close: function(modalId) {
      const modal = $(`#${modalId}`);

      gsap.to(modal[0], {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          modal.hide().removeClass('active');
          $('body').css('overflow', 'auto');
        }
      });
    },

    init: function() {
      // 모달 닫기 버튼
      $('.modal-close').on('click', function() {
        const modal = $(this).closest('.modal');
        Modal.close(modal.attr('id'));
      });

      // 모달 배경 클릭 시 닫기
      $('.modal-overlay').on('click', function() {
        const modal = $(this).closest('.modal');
        Modal.close(modal.attr('id'));
      });
    }
  };

  /**
   * 로또 볼 애니메이션
   */
  window.LotteryBallAnimations = {
    /**
     * 로또 볼 등장 애니메이션
     * @param {string} containerSelector - 볼 컨테이너 선택자
     */
    appear: function(containerSelector) {
      const balls = $(containerSelector).find('.lottery-ball');

      gsap.from(balls, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1, // 순차적으로 등장
        ease: 'back.out(1.7)',
        delay: 0.2
      });
    },

    /**
     * 로또 볼 호버 애니메이션 설정
     */
    setupHoverEffect: function() {
      $('.lottery-ball').each(function() {
        const ball = this;

        $(ball).on('mouseenter', function() {
          gsap.to(ball, {
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        });

        $(ball).on('mouseleave', function() {
          gsap.to(ball, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }
  };

  /**
   * 카드 호버 애니메이션
   */
  window.CardAnimations = {
    init: function() {
      $('.card').each(function() {
        const card = this;

        $(card).on('mouseenter', function() {
          gsap.to(card, {
            y: -8,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        $(card).on('mouseleave', function() {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }
  };

  /**
   * 페이지 로드 시 초기화
   */
  $(document).ready(function() {
    // ScrollTrigger 새로고침 (컴포넌트 로드 후)
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // 스크롤 애니메이션 초기화
    ScrollAnimations.init();

    // 부드러운 스크롤 초기화
    SmoothScroll.init();

    // 모달 초기화
    Modal.init();

    // 카드 애니메이션 초기화
    CardAnimations.init();

    // 로또 볼 호버 애니메이션
    LotteryBallAnimations.setupHoverEffect();
  });

  // 윈도우 리사이즈 시 ScrollTrigger 새로고침
  $(window).on('resize', () => {
    ScrollTrigger.refresh();
  });

})(jQuery);
