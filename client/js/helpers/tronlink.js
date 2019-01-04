$(window).on("load", function () {
    const FOUNDATION_ADDRESS = 'TELUCyWVaGBA2gpSbuJxNnueyWHUDFGAyA';
    var state = {
        tronWeb: {
            installed: false,
            loggedIn: false
        },
        currentComment: {
            comment: '',
            loading: false
        },
        comments: {
            recent: {},
            featured: []
        }
    }

    const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
    };

    if (tronWebState.installed) {
        Session.set('tron_link', tronWebState.installed)
        Session.set('tron_link_logged', tronWebState.loggedIn)
    }

    let tries = 0;

    const timer = setInterval(() => {
        if (tries >= 10) {
            const TRONGRID_API = 'https://api.trongrid.io';

            window.tronWeb = new TronWeb(
                TRONGRID_API,
                TRONGRID_API,
                TRONGRID_API
            );

            this.setState({
                tronWeb: {
                    installed: false,
                    loggedIn: false
                }
            });

            clearInterval(timer);
            return;
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

    }, 100);

    if (window.tronWeb && !tronWebState.loggedIn) {
        // Set default address (foundation address) used for contract calls
        // Directly overwrites the address object as TronLink disabled the
        // function call
        window.tronWeb.defaultAddress = {
            hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
            base58: FOUNDATION_ADDRESS
        }

        window.tronWeb.on('addressChanged', () => {
            if (this.state.tronWeb.loggedIn)
                return;

            this.setState({
                tronWeb: {
                    installed: true,
                    loggedIn: true
                }
            });
        });
    }
    else {
        async function getBalance() {
            const address = window.tronWeb.defaultAddress
            Session.set('trx_address', address);
            tronWeb.trx.getBalance(address.base58, (err, balance) => {
                if (err)
                    return console.error(err);
                Session.set('trx_balance', balance);
            });
            tronWeb.trx.getBandwidth(address.base58).then(bandwidth => {
                console.group('Account bandwidth');
                console.log('- Bandwidth:', bandwidth, '\n');
                console.groupEnd();
            }).catch(err => console.error(err));
        }
        async function getAccount() {
            const address = window.tronWeb.defaultAddress
            tronWeb.trx.getAccount(address.base58, (err, result) => {
                if (err)
                    return console.error(err);
                if (result.asset) {
                    for (i = 0; i < result.asset.length; i++) {
                        if (result.asset[i].key === 'OnGameToken') {
                            Session.set('ogt_balance', parseFloat(result.asset[i].value).toFixed(2))
                        }
                    }
                }
            });
        }
        getBalance();
        getAccount();
    }
})