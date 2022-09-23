const { searchCriteria, struct, envelope } = require('./config');
var config = require('./config');
var Imap = require('imap'),
    inspect = require('util').inspect;
var fs = require('fs'), filestream;
var buffer = '';
var searchCriterias = config.searchCriterias;
var searchWhere = config.searchWhere;
var searchFor = config.searchFor;
var makeSeen = config.markSeen;
var getStruct = config.struct;
var getSize = config.size;
var getEnvelope = config.envelope;

var imap = new Imap({
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    tls: config.tls, 
    connTimeout: config.connTimeout,
    authTimeout: config.authTimeout,
    debug: config.debug,
    tlsOptions: config.tlsOptions,
    mailbox: config.mailbox,
    searchFilter: config.searchFilter,
    fetchUnreadOnStart: config.fetchUnreadOnStart,
    mailParserOptions: config.mailParserOptions,
    attachments: config.attachments,
    attachmentOptions: config.attachmentOptions,
});

module.exports = {
    run: function(){
        function openInbox(arg){
            imap.openBox('Inbox', false, arg);
        }

        imap.once('ready', function(){
            console.log('parsing inbox for error alerts...');
            openInbox(function(err, box){
                if(err) throw err;
                imap.search(
                    [searchCriterias, [searchWhere, searchFor]],
                    function(err, results){
                        if(err) throw err;
                        else if(!results || !results.length){
                            console.log('No new mail.');
                        }
                        else{
                            var f = imap.fetch(results, {bodies: '1', markSeen: makeSeen, struct: getStruct, envelope: getEnvelope, size: getSize});
                            f.on('message', function(msg, seqno){
                                console.log('message number: ' + seqno);
                                var prefix = '(#' + seqno + ') ';
                                msg.on('body', function (stream, info){
                                    stream.on('data', function(chunk){
                                        buffer += chunk.toString('utf8');
                                    })
                                    stream.once('end', function(){
                                        if(info.which === '1'){
                                        }
                                    });
                                    console.log(prefix + ' body: ');
                                    console.log(stream);

                                    stream.pipe(fs.createWriteStream('./output/'+ seqno + '-body.txt'));
                                });
                                msg.once('end', function () {
                                    console.log(prefix + ': End of message.');
                                });
                            });
                        }
                    }
                )
            });
        });
        imap.once('error', function (err) {
            console.log(err);
        });
        
        imap.once('end', function () {
            console.log('Connection ended');
        });

        imap.connect();
    }
}