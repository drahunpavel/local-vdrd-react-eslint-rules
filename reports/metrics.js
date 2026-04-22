export const metrics = {
    constantNaming: { checked: 0, errors: 0 },
    enumNaming: { checked: 0, errors: 0 },
    componentNaming: { checked: 0, errors: 0 },
    variableAndFunctionNaming: { checked: 0, errors: 0 },

    flushed: false,
};

export const flushMetrics = () => {
    if (metrics.flushed) return;
    metrics.flushed = true;

    const totalChecked =
        metrics.constantNaming.checked +
        metrics.enumNaming.checked +
        metrics.componentNaming.checked +
        metrics.variableAndFunctionNaming.checked;

    const totalErrors =
        metrics.constantNaming.errors +
        metrics.enumNaming.errors +
        metrics.componentNaming.errors +
        metrics.variableAndFunctionNaming.errors;

    const cleanPercent = totalChecked === 0 ? 100 : 100 - (totalErrors / totalChecked) * 100;

    console.log('\n=== vdrd-react-eslint-rules metrics ===\n');
    console.log('totalChecked: ', totalChecked);
    console.log('totalErrors: ', totalErrors);
    console.log('cleanPercent: ', Number(cleanPercent.toFixed(2)), '\n');
};
