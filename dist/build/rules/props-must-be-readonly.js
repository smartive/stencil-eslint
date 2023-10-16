import ts from 'typescript';
import { getDecorator, parseDecorator, stencilComponentContext } from '../utils';
const rule = {
    meta: {
        docs: {
            description: 'This rule catches Stencil Props marked as non readonly.',
            category: 'Possible Errors',
            recommended: true
        },
        schema: [],
        type: 'layout',
        fixable: 'code'
    },
    create(context) {
        const stencil = stencilComponentContext();
        const parserServices = context.parserServices;
        return Object.assign(Object.assign({}, stencil.rules), { 'PropertyDefinition': (node) => {
                var _a;
                const propDecorator = getDecorator(node, 'Prop');
                if (stencil.isComponent() && propDecorator) {
                    const [opts] = parseDecorator(propDecorator);
                    if (opts && opts.mutable === true) {
                        return;
                    }
                    const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                    const hasReadonly = !!(ts.canHaveModifiers(originalNode) &&
                        ((_a = ts.getModifiers(originalNode)) === null || _a === void 0 ? void 0 : _a.some(m => m.kind === ts.SyntaxKind.ReadonlyKeyword)));
                    if (!hasReadonly) {
                        context.report({
                            node: node.key,
                            message: `Class properties decorated with @Prop() should be readonly`,
                            fix(fixer) {
                                return fixer.insertTextBefore(node.key, 'readonly ');
                            }
                        });
                    }
                }
            } });
    }
};
export default rule;
