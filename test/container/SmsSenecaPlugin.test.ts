let _ = require('lodash');
let assert = require('chai').assert;

let pluginOptions = {
    logger: {
        level: 'debug'
    },
    service: {
        connection: {
            protocol: 'none'
        }
    }
};

suite('SmsSenecaPlugin', ()=> {
    let seneca;

    suiteSetup((done) => {
        seneca = require('seneca')({ strict: { result: false } });

        // Load Seneca plugin
        let plugin = require('../../src/container/SmsSenecaPlugin');
        seneca.use(plugin, pluginOptions);

        seneca.ready(done);
    });

    suiteTeardown((done) => {
        seneca.close(done);
    });

    test('Send message', (done) => {
        seneca.act(
            {
                role: 'sms',
                cmd: 'send_message',
                message: {
                    to: '+15202234523',
                    text: 'This is a test message'
                }
            },
            (err, result) => {
                assert.isNull(err);
                done();
            }
        );
    });
});