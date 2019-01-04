

Template.transfermodal.rendered = function () {
}


Template.transfermodal.init = function () {
    Session.set('to',false)
    Session.set('amount','')
    Session.set('memo','')
    $("#to").change(function () {
        steem.api.lookupAccountNames([$("#to").val()], function (error, result) {
            if (result[0] === null) {
                $(".to.message.green").addClass('hidden')
                $(".to.message.red").removeClass('hidden')
                $("#amount").prop('disabled', true);
                $("#memo").prop('disabled', true);
                $("#addbalance").addClass('disabled')
                $("#confirmtransfer").addClass('disabled')
            }
            else {
                $(".to.message.green").removeClass('hidden')
                $(".to.message.red").addClass('hidden')
                $("#amount").prop('disabled', false);
                $("#memo").prop('disabled', false);
                $("#addbalance").removeClass('disabled')
                Session.set('to',$("#to").val())
            }
        });
    })
    $("#addbalance").click(function () {
        var balance = $("#addbalance").text().split(' ')
        $("#amount").val(balance[2])
        $(".amount.message.red").addClass('hidden')
        Session.set('amount',balance[2]) 
        $("#confirmtransfer").removeClass('disabled')
    })
    $("#amount").change(function () {
        var balance = $("#addbalance").text().split(' ')
        if($("#amount").val() <= balance[2])
        {
            $(".amount.message.red").addClass('hidden')
            Session.set('amount',$("#amount").val()) 
            if(Session.get('to') && Session.get('amount'))
            {
                $("#confirmtransfer").removeClass('disabled')
            }
        }
        else
        {
            $(".amount.message.red").removeClass('hidden')
            $("#confirmtransfer").addClass('disabled')
        }

    })
    $("#memo").change(function () {
        Session.set('memo',$("#memo").val())
    })

    document.getElementById("confirmtransfer").addEventListener("click", confirmTransfer);

    function confirmTransfer() {
        if(Session.get('to') && Session.get('amount'))
        {
            $('.ui.transfer.modal').modal('hide')
            var coin = 'STEEM'
            var url = "https://steemconnect.com/sign/transfer?to=" + Session.get('to') + "&amount=" + parseFloat(Session.get('amount')).toFixed(3) + " " + coin + "&memo=" + Session.get('memo')
            var win = window.open(url, '_blank');
            win.focus();
        }
    }
}

Template.transfermodal.events({

})

