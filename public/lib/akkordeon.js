console.log('akkordion');
// >>>>>>>>>>>>>>>>>>>>> akkordion >>>>>>>>>>>>>>>>>>>

class Akkordeon {
    constructor(opt) {
        this.item = 0;
        this.parent = opt.parent;
        this.currentItem = 0;
        this.down = opt.down;
        this.up = opt.up;
        this.slider;
    }
    init() {
        const I = this.parent;

        $(window).on('click', `#${I} [data-top]`, e => {
        
            this.item = +$(e.target).parent().attr('data-top');

            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $(`#${I} [data-top="${this.item}"]`).offset().top
                }, 800);
            }, 350);

            const akDown = document.querySelector(`#${I} [data-down="${this.item}"]`);
            const akCurDown = document.querySelector(`#${I} [data-down="${this.currentItem}"]`);
            const tempCurDown = +$(akCurDown).attr(`data-down`);
            const stateDisplay = getComputedStyle(akDown).display;

            if (stateDisplay === 'none') {
                $(`#${I} [data-top="${this.item}"]`).addClass('akar_up_active');
                $(`#${I} [data-top="${this.item}"] > .akk_title_img img`).attr('src', `images/${this.up}.png`);
                $(akDown).slideDown(300, () => this.currentItem = this.item);
            } else {
                $(akDown).slideUp(300, () => {
                    this.currentItem = this.item;
                    $(`#${I} [data-top="${this.item}"]`).removeClass('akar_up_active');
                    $(`#${I} [data-top="${this.item}"] > .akk_title_img img`).attr('src', `images/${this.down}.png`);
                });
            }

            if (this.item !== tempCurDown) {
                $(akCurDown).slideUp(300, () => {
                    $(`#${I} [data-top="${tempCurDown}"]`).removeClass('akar_up_active');
                    $(`#${I} [data-top="${tempCurDown}"] > .akk_title_img img`).attr('src', `images/${this.down}.png`);
                });
            }
        });
    }
    onClick(index) {
        const I = this.parent;
        $(`#${I} [data-top="${index}"]`).addClass('akar_up_active');
        this.item = index;
        $(`#${I} [data-top="${this.item}"] > .akk_title_img img`).attr('src', `images/${this.up}.png`);
        $(`#${I} [data-down="${this.item}"]`).slideDown(300, () => this.currentItem = this.item);
    }
    get cb_length() {
        const I = this.parent;
        return $(`#${I} [data-top]`).length;
    }
    localController(location) {
        const I = this.parent;
        if (!!location) {
            const loc = location.substr(1).split('&');

            loc.forEach(item => {
                let locKey = item.split('=')[0];
                let locValue = item.split('=')[1];

                if (locKey === 'slide') {
                    locValue = +locValue;
                    if (locValue > 0
                        && locValue <= this.cb_length
                        && typeof locValue === 'number') {
                        this.slider = `#${I} [data-top="${locValue - 1}"]`;
                        onScroll(this.slider);
                        this.onClick(locValue - 1);
                    }
                }
            });
        }
    }

}

const akkordion1 = new Akkordeon({ parent: 'akk1', down: 'down_1', up: 'up_1' });
akkordion1.init();

setTimeout(() => {
    akkordion1.localController(window.location.search);
}, 500);