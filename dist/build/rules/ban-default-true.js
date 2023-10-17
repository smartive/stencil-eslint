import { getDecorator, stencilComponentContext } from '../utils';
const rule = {
    meta: {
        docs: {
            description: 'This rule catches Stencil Props defaulting to true.',
            category: 'Possible Errors',
            recommended: true
        },
        schema: [],
        type: 'problem',
    },
    create(context) {
        const stencil = stencilComponentContext();
        return Object.assign(Object.assign({}, stencil.rules), { 'PropertyDefinition': (node) => {
                var _a;
                const propDecorator = getDecorator(node, 'Prop');
                if (!(stencil.isComponent() && propDecorator)) {
                    return;
                }
                if (((_a = node.value) === null || _a === void 0 ? void 0 : _a.value) === true) {
                    context.report({
                        node: node,
                        message: `Boolean properties decorated with @Prop() should default to false`
                    });
                }
            } });
    }
};
export default rule;
