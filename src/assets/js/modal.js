/* 
    ============================================
    G5Framework
    =============================================
	G5 Modal
    --------
    Usage Examples:
		<a href="#" rel="modal" data-modal_content="example">Load Example Modal</a>
		Data:			
			modal_type = style to associate with modal (standard by default)
			modal_content = ID of element to be loaded
		Exit Ramp Modal:
		<a href="http://google.com" rel="external">Exit Ramp</a>
    ==============================================
*/
var saasModal = {
    elements: {
        container: $('[role="main"]') || $('body').next(),
        overlay: $('.overlay'),
        overlayBg: $('.overlay-bg'),
        openAnchor: $('a[rel="modal"], a[rel="external"]'),
        closeAnchor: '.modal-close, .exit-cancel, .overlay-bg'
    },
    openModal: function(el, modalType, exitLink) {
        var el = $('#' + el + ''),
            modalType = modalType || 'standard',
            modalMarkUp = el.html(),
            overlayContent = saasModal.elements.container.find('.overlay-content'),
            externalLink = exitLink || null;

        overlayContent.html(modalMarkUp);

        (function() {

            var modalBase = overlayContent.children('.modal');

            modalBase.addClass('' + modalType + ' active');

            if (modalType === 'exit-ramp') {
                var _continueLink = modalBase.find('.exit-continue');
                _continueLink.attr({
                    href: externalLink
                });
            }

            saasModal.elements.container.find('.overlay').fadeIn(250);

            (function() {
                var modalHeight = modalBase.innerHeight(),
                    distanceFromTop = $(window).scrollTop();

                if ($('html').is('.touch')) {
                    $('html, body').scrollTop(0);
                } else {
                    modalBase.css('margin-top', '-' + (modalHeight / 2) + 'px');
                }

                modalBase.find('.modal-close, .exit-cancel').on('click', function(event) {
                    saasModal.closeModal();
                    $('html, body').scrollTop(distanceFromTop);
                    event.preventDefault();
                });
            }());

        })();
    },
    closeModal: function() {
        saasModal.elements.container.find('.overlay').removeClass('active').fadeOut(250);
    },
    events: function() {
        saasModal.elements.openAnchor.on('click', function(event) {
            var $this = $(this),
                _modalData = $this.data(),
                _modalType = _modalData.modal_type || 'exit-ramp',
                _modalContent = _modalData.modal_content || 'exit-ramp';

            if ($this.attr('rel') === 'external') {
                var externalLink = $this.attr('href');
                saasModal.openModal(_modalContent, _modalType, externalLink);
            } else {
                saasModal.openModal(_modalContent, _modalType);
            }

            event.preventDefault();
        });

        $(saasModal.elements.closeAnchor).on('click', function(event) {
            saasModal.closeModal();
            event.preventDefault();
        });

        $(document).keyup(function(e) {
            if (saasModal.elements.container.find('.overlay').is(':visible')) {
                if (e.keyCode === 27) {
                    saasModal.closeModal();
                }
            }
        });
    },
    init: function() {
        if (!saasModal.elements.overlay.length) {
            var overlayMarkup = '<div class="overlay">'
                + '<div class="overlay-bg">&nbsp;</div>'
                + '<div class="overlay-content">&nbsp;</div>'
                + '</div>';

            this.elements.container.append(overlayMarkup);
        }
        this.events();
    }
};
