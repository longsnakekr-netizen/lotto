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
    }
  });

})(jQuery);
