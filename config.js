const config = {
    user: 'email@address.com', //place email address here
    password: 'pw', //place pw here (will change from plaintext later)
    host: 'host.secureserver.net', //place imap server here
    port: 993, //imap port here
    tls: true, //bool tls
    connTimeout: 10000, //connection timeout
    authTimeout: 5000, //auth timeout
    debug: console.log, //output for debug, use a custom method of global if preferred
    tlsOptions: {rejectUnauthorized: false}, //object for tls options
    mailbox: "INBOX", //mailbox to be parsed
    struct: false, //fetch message structure
    envelope: false, //fetch message envelope
    size: false, //fetch message size
    searchFilter: ["UNSEEN", "FLAGGED"], //search filter being used after an IDLE notification has been retrieved 
    markSeen: false, //mark parsed emails as seen/opened
    fetchUnreadOnStart: true, //use to retrieve all unread mail on lib start, default is false
    mailParserOptions: {streamAttachments: false}, //object providing option to fetch attachments
    attachments: false, //download attachments as they are encountered to project directory
    attachmentOptions: {directory: "attachments/"}, //download attachments to folder option

    searchCriterias: 'UNSEEN', //other options: ALL, ANSWERED, DELETED, DRAFT, FLAGGED, NEW, SEEN, RECENT, OLD, UNANSWERED, UNDELETED, UNDRAFT, UNFLAGGED, UNSEEN
                            //date options (js date object or date instance as input): BEFORE, ON, SINCE, SENTBEFORE, SENTSINCE
                            //integer value options: LARGER, SMALLER
                            //UID: provide an array of seq numbers or range: ['24:29', 19, '66:*]
    searchWhere: 'SUBJECT', //Messages that contain specified string in this place; other options: BCC, CC, FROM, TO, SUBJECT, BODY, TEXT (HEADER OR BODY), KEYWORD, HEADER
    searchFor: 'Error Alerts', //the string (or date, or numeral) to search for with imap.search() method.

};

module.exports = config;
