// const api = require('@opentelemetry/api');
// const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
// const { Resource } = require('@opentelemetry/resources');
// const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');
// const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
// const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');
// const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
// const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
// const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// module.exports = function (serviceName) {
//     const provider = new NodeTracerProvider({
//         resource: new Resource({
//             [SemanticResourceAttributes.SERVICE_NAME]: serviceName
//         })
//     });
//     provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({ url: 'http://192.168.1.10:4318/v1/traces' })));
//     provider.register();
//     registerInstrumentations({
//         instrumentations: [
//             getNodeAutoInstrumentations(),
//             new HttpInstrumentation(),
//             new MongoDBInstrumentation({ enhancedDatabaseReporting: true }),
//             new ExpressInstrumentation({
//                 requestHook: (span, requestInfo) => {
//                     span.setAttribute("http.request.body", JSON.stringify(requestInfo.req.body));
//                   }
//             }),
//         ],
//         tracerProvider: provider
//     });
//     return api.trace.getTracer(serviceName);
// }


const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new opentelemetry.NodeSDK({
    serviceName: 'poc-observability',
    traceExporter: new OTLPTraceExporter({ url: 'http://192.168.1.10:4318/v1/traces' }),
    instrumentations: [
        getNodeAutoInstrumentations({
            "@opentelemetry/instrumentation-mongodb": {
                enhancedDatabaseReporting: true,
                enabled: true,
            },
        }),
    ],
    autoDetectResources: true
});

sdk.start();