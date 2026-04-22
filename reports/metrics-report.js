import { flushMetrics } from './metrics.js';

export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Выводит общую метрику всех правил',
        },
        schema: [],
    },

    create() {
        // регистрируем flush один раз
        if (!process.__vdrdMetricsHookInstalled) {
            process.__vdrdMetricsHookInstalled = true;

            process.on('exit', () => {
                flushMetrics();
            });
        }

        return {};
    },
};
