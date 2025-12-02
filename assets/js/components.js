/**
 * 컴포넌트 로더
 * HTML 컴포넌트를 동적으로 로드하여 재사용 가능하게 만듭니다.
 */

(function($) {
  'use strict';

  /**
   * 컴포넌트 로딩 함수
   */
  window.LottoComponents = {
    /**
     * 모든 공통 컴포넌트 로드
     */
    loadAll: function() {
      this.loadHeader();
      this.loadNavigation();
      this.loadFooter();
      this.loadFloatingLeft();
    },

    /**
     * 헤더 로드
     */
    loadHeader: function() {
      $('#header').load('components/header.html', function(response, status, xhr) {
        if (status === 'error') {
          console.error('헤더 로드 실패:', xhr.status, xhr.statusText);
        }
      });
    },

    /**
     * 네비게이션 로드
     */
    loadNavigation: function() {
      $('#navigation').load('components/navigation.html', function(response, status, xhr) {
        if (status === 'error') {
          console.error('네비게이션 로드 실패:', xhr.status, xhr.statusText);
        }
      });
    },

    /**
     * 푸터 로드
     */
    loadFooter: function() {
      $('#footer').load('components/footer.html', function(response, status, xhr) {
        if (status === 'error') {
          console.error('푸터 로드 실패:', xhr.status, xhr.statusText);
        }
      });
    },

    /**
     * 왼쪽 플로팅 메뉴 로드
     */
    loadFloatingLeft: function() {
      $('#floating-left').load('components/floating-left.html', function(response, status, xhr) {
        if (status === 'error') {
          console.error('왼쪽 플로팅 메뉴 로드 실패:', xhr.status, xhr.statusText);
        }
      });
    },

  };

  /**
   * 로또 볼 생성 함수
   * @param {number} number - 로또 번호 (1-45)
   * @param {boolean} isBonus - 보너스 번호 여부
   * @param {string} size - 크기 ('small', 'medium', 'large')
   * @returns {string} HTML 문자열
   */
  window.createLotteryBall = function(number, isBonus = false, size = 'medium') {
    let colorClass = '';

    if (isBonus) {
      colorClass = 'bonus';
    } else if (number >= 1 && number <= 10) {
      colorClass = 'range-1-10';
    } else if (number >= 11 && number <= 20) {
      colorClass = 'range-11-20';
    } else if (number >= 21 && number <= 30) {
      colorClass = 'range-21-30';
    } else if (number >= 31 && number <= 40) {
      colorClass = 'range-31-40';
    } else if (number >= 41 && number <= 45) {
      colorClass = 'range-41-45';
    }

    const sizeClass = size === 'small' ? 'lottery-ball-small' :
                      size === 'large' ? 'lottery-ball-large' : '';

    return `<span class="lottery-ball ${colorClass} ${sizeClass}">${number}</span>`;
  };

  /**
   * 여러 로또 볼을 생성하는 함수
   * @param {Array<number>} numbers - 로또 번호 배열
   * @param {number} bonusNumber - 보너스 번호 (선택)
   * @param {string} size - 크기
   * @returns {string} HTML 문자열
   */
  window.createLotteryBalls = function(numbers, bonusNumber = null, size = 'medium') {
    let html = '<div class="flex items-center gap-2 flex-wrap">';

    // 일반 번호
    numbers.forEach(num => {
      html += createLotteryBall(num, false, size);
    });

    // 보너스 번호 (있을 경우)
    if (bonusNumber !== null) {
      html += '<span class="text-gray-400 mx-2">+</span>';
      html += createLotteryBall(bonusNumber, true, size);
    }

    html += '</div>';
    return html;
  };

  /**
   * 숫자 포맷팅 (천단위 콤마)
   * @param {number} num - 숫자
   * @returns {string} 포맷된 문자열
   */
  window.formatNumber = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  /**
   * 날짜 포맷팅
   * @param {Date|string} date - 날짜
   * @param {string} format - 포맷 ('YYYY-MM-DD', 'YYYY.MM.DD' 등)
   * @returns {string} 포맷된 날짜 문자열
   */
  window.formatDate = function(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  };

  /**
   * 모바일에서 테이블 스크롤바 항상 표시 설정 - 강력한 버전
   */
  window.initTableScrollbars = function() {
    // 모바일 디바이스 체크
    if (window.innerWidth <= 768) {
      // 모든 테이블을 찾아서 처리
      $('table').each(function() {
        const $table = $(this);
        const $parent = $table.parent();

        // 스크롤 가능한 클래스 추가
        if (!$parent.hasClass('overflow-x-auto') &&
            !$parent.hasClass('table-container') &&
            !$parent.hasClass('overflow-auto')) {
          $parent.addClass('overflow-x-auto');
        }

        // 스크롤바 강제 표시를 위한 스타일 적용
        $parent.css({
          'overflow-x': 'scroll', // auto 대신 scroll 사용 - 항상 스크롤바 표시
          'overflow-y': 'hidden',
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'thin', // Firefox
          'scrollbar-color': 'rgba(75, 85, 99, 1) rgba(229, 231, 235, 1)', // Firefox
          'padding-bottom': '16px', // 스크롤바 공간 확보
          'min-height': 'calc(100% + 16px)' // 최소 높이 설정
        });

        // Webkit 브라우저용 추가 스타일 (동적으로 스타일 태그 추가)
        const parentId = $parent.attr('id') || 'table-scroll-' + Math.random().toString(36).substr(2, 9);
        if (!$parent.attr('id')) {
          $parent.attr('id', parentId);
        }

        // 이미 스타일이 추가되었는지 확인
        if (!$('#scrollbar-style-' + parentId).length) {
          const style = `
            <style id="scrollbar-style-${parentId}">
              #${parentId}::-webkit-scrollbar {
                height: 16px !important;
                visibility: visible !important;
                opacity: 1 !important;
                display: block !important;
              }
              #${parentId}::-webkit-scrollbar-track {
                background: rgba(229, 231, 235, 1) !important;
                border-radius: 8px !important;
                visibility: visible !important;
              }
              #${parentId}::-webkit-scrollbar-thumb {
                background: rgba(75, 85, 99, 1) !important;
                border-radius: 8px !important;
                border: 3px solid rgba(229, 231, 235, 1) !important;
                min-width: 50px !important;
              }
              #${parentId}::-webkit-scrollbar-thumb:hover {
                background: rgba(55, 65, 81, 1) !important;
              }
            </style>
          `;
          $('head').append(style);
        }

        // 스크롤 위치를 약간 움직여서 스크롤바를 활성화
        const scrollLeft = $parent.scrollLeft();
        $parent.scrollLeft(1);
        setTimeout(() => {
          $parent.scrollLeft(scrollLeft);
        }, 10);
      });

      // 주기적으로 스크롤바 상태 확인 (iOS Safari 대응)
      setInterval(function() {
        $('.overflow-x-auto, .table-container, .overflow-auto').each(function() {
          const $elem = $(this);
          if ($elem.css('overflow-x') !== 'scroll') {
            $elem.css('overflow-x', 'scroll');
          }
        });
      }, 1000); // 1초마다 확인
    }
  };

  // 페이지 로드 시 컴포넌트 자동 로드
  $(document).ready(function() {
    // 컴포넌트 컨테이너가 있으면 자동으로 로드
    if ($('#header').length || $('#navigation').length || $('#footer').length) {
      // 모든 컴포넌트 로드
      let loadedCount = 0;
      let totalComponents = 3; // 기본: header, navigation, footer

      // floating 요소가 있는지 체크
      if ($('#floating-left').length) totalComponents++;
      if ($('#floating-right').length) totalComponents++;

      function checkAllLoaded() {
        loadedCount++;
        if (loadedCount >= totalComponents) {
          // 모든 컴포넌트가 로드되면 페이지 표시
          setTimeout(function() {
            $('body').addClass('loaded');
            // 테이블 스크롤바 초기화
            initTableScrollbars();
          }, 50);
        }
      }

      // 각 컴포넌트 로드 시 카운트
      $('#header').load('components/header.html', checkAllLoaded);
      $('#navigation').load('components/navigation.html', checkAllLoaded);
      $('#footer').load('components/footer.html', checkAllLoaded);

      if ($('#floating-left').length) {
        $('#floating-left').load('components/floating-left.html', checkAllLoaded);
      }

      if ($('#floating-right').length) {
        $('#floating-right').load('components/floating-right.html', checkAllLoaded);
      }
    } else {
      // 컴포넌트가 없으면 바로 표시
      $('body').addClass('loaded');
      // 테이블 스크롤바 초기화
      setTimeout(initTableScrollbars, 50);
    }

    // 윈도우 리사이즈 시에도 테이블 스크롤바 재초기화
    let resizeTimeout;
    $(window).resize(function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        initTableScrollbars();
      }, 250);
    });
  });

})(jQuery);
