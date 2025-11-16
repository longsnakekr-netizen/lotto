/**
 * 로또 당첨 횟수 분석 모듈
 */

// 당첨 횟수 분석 클래스
class LottoFrequencyAnalyzer {
    constructor(data) {
        this.data = data;
    }

    // 특정 범위의 회차에서 각 번호별 출현 횟수 계산
    calculateFrequency(startRound, endRound) {
        const frequency = {};

        // 1-45 초기화
        for (let i = 1; i <= 45; i++) {
            frequency[i] = 0;
        }

        // 범위 내 회차 순회
        for (let round = startRound; round <= endRound; round++) {
            if (this.data.results[round]) {
                this.data.results[round].numbers.forEach(num => {
                    frequency[num]++;
                });
            }
        }

        return frequency;
    }

    // 횟수별 번호 그룹화 (당첨 횟수 분류 테이블용)
    groupByFrequency(frequency) {
        const groups = {};

        Object.entries(frequency).forEach(([number, count]) => {
            if (!groups[count]) {
                groups[count] = [];
            }
            groups[count].push(parseInt(number));
        });

        // 횟수 내림차순 정렬
        return Object.entries(groups)
            .sort((a, b) => b[0] - a[0])
            .map(([count, numbers]) => ({
                count: parseInt(count),
                numbers: numbers.sort((a, b) => a - b),
                quantity: numbers.length
            }));
    }

    // 분포도 데이터 생성
    getDistributionData(frequency, recentRounds) {
        // 각 횟수(행)와 번호(열)의 매트릭스
        const matrix = {};

        Object.entries(frequency).forEach(([number, count]) => {
            if (!matrix[count]) {
                matrix[count] = new Set();
            }
            matrix[count].add(parseInt(number));
        });

        // 최근 회차 정보 추가 (어떤 번호가 최근에 당첨되었는지)
        const highlights = {};
        recentRounds.forEach(({ round, color }) => {
            if (this.data.results[round]) {
                this.data.results[round].numbers.forEach(num => {
                    if (!highlights[num]) {
                        highlights[num] = [];
                    }
                    highlights[num].push({ round, color });
                });
            }
        });

        return { matrix, highlights };
    }

    // 사용 가능한 회차 범위 가져오기
    getAvailableRounds() {
        const rounds = Object.keys(this.data.results).map(Number).sort((a, b) => a - b);
        return {
            min: rounds[0],
            max: rounds[rounds.length - 1],
            total: rounds.length
        };
    }
}

// UI 렌더러
class FrequencyRenderer {
    constructor(analyzer) {
        this.analyzer = analyzer;
    }

    // 분류 테이블 렌더링
    renderClassificationTable(groupedData, startRound, endRound) {
        const tbody = document.getElementById('win-count-table-body');
        const header = document.getElementById('win-count-range-header');

        if (!tbody || !header) return;

        header.textContent = `${startRound}~${endRound}`;

        let html = '';
        groupedData.forEach(group => {
            html += `
                <tr class="border-b border-gray-200">
                    <td class="py-4 px-4 text-center font-medium border-r border-gray-200">
                        ${group.count}
                    </td>
                    <td class="py-4 px-4 border-r border-gray-200">
                        ${this.formatNumbers(group.numbers)}
                    </td>
                    <td class="py-4 px-4 text-center">${group.quantity}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }

    // 분포도 테이블 렌더링
    renderDistributionTable(distributionData, sortedCounts) {
        const tbody = document.getElementById('win-count-distribution-body');

        if (!tbody) return;

        let html = '';
        // 상위 횟수들만 표시 (최대 15개 행)
        const displayCounts = sortedCounts.slice(0, 15);

        displayCounts.forEach(count => {
            html += '<tr class="border-b border-gray-200">';
            html += `<td class="py-2 px-1 text-center font-medium bg-gray-50 border-r border-gray-200">${count}</td>`;

            for (let num = 1; num <= 45; num++) {
                const hasNumber = distributionData.matrix[count]?.has(num);
                const highlight = distributionData.highlights[num];

                let cellClass = 'py-2 px-1 border-r border-gray-200';
                let cellContent = '';

                if (hasNumber) {
                    if (highlight && highlight.length > 0) {
                        // 최근 회차에서 당첨된 번호 - 색상 표시
                        cellClass += ` ${highlight[0].color}`;
                    } else {
                        // 해당 횟수에 있는 번호 - 회색 배경
                        cellClass += ' bg-gray-200';
                    }
                }

                // 마지막 열은 border-r 제거
                if (num === 45) {
                    cellClass = cellClass.replace('border-r border-gray-200', '');
                }

                html += `<td class="${cellClass}">${cellContent}</td>`;
            }
            html += '</tr>';
        });

        tbody.innerHTML = html;
    }

    // 범례 업데이트
    updateLegend(round1, round2) {
        const legendContainer = document.getElementById('win-count-legend');
        if (!legendContainer) return;

        legendContainer.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="text-sm font-medium">${round1}회차</span>
                <div class="w-4 h-4 bg-red-500"></div>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-sm font-medium">${round2}회차</span>
                <div class="w-4 h-4 bg-green-500"></div>
            </div>
        `;
    }

    // 번호 포맷팅 (특정 번호는 빨간색으로 강조)
    formatNumbers(numbers, highlightNumbers = []) {
        return numbers.map(n => {
            const isHighlight = highlightNumbers.includes(n);
            const className = isHighlight ? 'text-red-500 font-bold' : 'font-medium';
            return `<span class="${className} mr-2">${n}</span>`;
        }).join('');
    }
}

// 메인 컨트롤러
class LottoFrequencyController {
    constructor() {
        this.analyzer = null;
        this.renderer = null;
        this.data = null;
    }

    // 초기화
    async init() {
        try {
            // JSON 데이터 로드
            const response = await fetch('assets/data/lotto-results.json');
            if (!response.ok) {
                throw new Error('데이터를 불러올 수 없습니다.');
            }

            this.data = await response.json();
            this.analyzer = new LottoFrequencyAnalyzer(this.data);
            this.renderer = new FrequencyRenderer(this.analyzer);

            // 초기 범위 설정
            const range = this.analyzer.getAvailableRounds();
            this.setDefaultValues(range);

            // 이벤트 바인딩
            this.bindEvents();

            // 초기 데이터 표시
            this.performAnalysis();

            console.log('로또 분석 모듈 초기화 완료');
        } catch (error) {
            console.error('초기화 실패:', error);
            this.showError('데이터를 불러오는데 실패했습니다.');
        }
    }

    // 기본값 설정
    setDefaultValues(range) {
        const startInput = document.getElementById('win-count-start');
        const endInput = document.getElementById('win-count-end');

        if (startInput) {
            startInput.value = range.min;
            startInput.min = range.min;
            startInput.max = range.max;
        }

        if (endInput) {
            endInput.value = range.max;
            endInput.min = range.min;
            endInput.max = range.max;
        }
    }

    // 이벤트 바인딩
    bindEvents() {
        const searchBtn = document.getElementById('win-count-search');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performAnalysis());
        }

        // Enter 키로도 검색 가능
        const startInput = document.getElementById('win-count-start');
        const endInput = document.getElementById('win-count-end');

        [startInput, endInput].forEach(input => {
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.performAnalysis();
                    }
                });
            }
        });
    }

    // 분석 실행
    performAnalysis() {
        const startInput = document.getElementById('win-count-start');
        const endInput = document.getElementById('win-count-end');

        if (!startInput || !endInput) return;

        const start = parseInt(startInput.value);
        const end = parseInt(endInput.value);

        // 유효성 검사
        if (isNaN(start) || isNaN(end)) {
            this.showError('회차를 올바르게 입력해주세요.');
            return;
        }

        if (start > end) {
            this.showError('시작 회차가 종료 회차보다 클 수 없습니다.');
            return;
        }

        const range = this.analyzer.getAvailableRounds();
        if (start < range.min || end > range.max) {
            this.showError(`사용 가능한 회차 범위: ${range.min} ~ ${range.max}`);
            return;
        }

        // 분석 실행
        const frequency = this.analyzer.calculateFrequency(start, end);
        const grouped = this.analyzer.groupByFrequency(frequency);
        const distribution = this.analyzer.getDistributionData(frequency, [
            { round: end, color: 'bg-red-500' },
            { round: end - 1, color: 'bg-green-500' }
        ]);

        // 렌더링
        this.renderer.renderClassificationTable(grouped, start, end);
        this.renderer.renderDistributionTable(distribution, grouped.map(g => g.count));
        this.renderer.updateLegend(end, end - 1);
    }

    // 에러 표시
    showError(message) {
        alert(message);
    }
}

// 전역 컨트롤러 인스턴스
let lottoFrequencyController = null;

// 초기화 함수
function initLottoFrequency() {
    lottoFrequencyController = new LottoFrequencyController();
    lottoFrequencyController.init();
}
