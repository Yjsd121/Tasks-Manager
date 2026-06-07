import { i as __toESM, t as require_react } from "./react-B6BdZLWZ.js";
import { t as clsx } from "./clsx-DmQhj6e5.js";
import { C as isPlainObject, D as require_prop_types, E as capitalize, T as isObjectEmpty, _ as Global, d as useTheme$1, f as createTheme, g as require_jsx_runtime, h as styled$1, m as internal_serializeStyles, n as createTheme$1, p as internal_mutateStyles, s as preprocessStyles, t as identifier_default, w as require_react_is, x as styleFunctionSx_default } from "./identifier-D-Q9ePvE.js";
//#region node_modules/@mui/utils/composeClasses/composeClasses.mjs
/**
* Compose classes from multiple sources.
*
* @example
* ```tsx
* const slots = {
*  root: ['root', 'primary'],
*  label: ['label'],
* };
*
* const getUtilityClass = (slot) => `MuiButton-${slot}`;
*
* const classes = {
*   root: 'my-root-class',
* };
*
* const output = composeClasses(slots, getUtilityClass, classes);
* // {
* //   root: 'MuiButton-root MuiButton-primary my-root-class',
* //   label: 'MuiButton-label',
* // }
* ```
*
* @param slots a list of classes for each possible slot
* @param getUtilityClass a function to resolve the class based on the slot name
* @param classes the input classes from props
* @returns the resolved classes for all slots
*/
function composeClasses(slots, getUtilityClass, classes = void 0) {
	const output = {};
	for (const slotName in slots) {
		const slot = slots[slotName];
		let buffer = "";
		let start = true;
		for (let i = 0; i < slot.length; i += 1) {
			const value = slot[i];
			if (value) {
				buffer += (start === true ? "" : " ") + getUtilityClass(value);
				start = false;
				if (classes && classes[value]) buffer += " " + classes[value];
			}
		}
		output[slotName] = buffer;
	}
	return output;
}
//#endregion
//#region node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.mjs
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_jsx_runtime = require_jsx_runtime();
function isEmpty(obj) {
	return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles$2(props) {
	const { styles, defaultTheme = {} } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Global, { styles: typeof styles === "function" ? (themeInput) => styles(isEmpty(themeInput) ? defaultTheme : themeInput) : styles });
}
GlobalStyles$2.propTypes = {
	defaultTheme: import_prop_types.default.object,
	styles: import_prop_types.default.oneOfType([
		import_prop_types.default.array,
		import_prop_types.default.string,
		import_prop_types.default.object,
		import_prop_types.default.func
	])
};
//#endregion
//#region node_modules/@mui/system/GlobalStyles/GlobalStyles.mjs
function wrapGlobalLayer(styles) {
	const serialized = internal_serializeStyles(styles);
	if (styles !== serialized && serialized.styles) {
		if (!serialized.styles.match(/^@layer\s+[^{]*$/)) serialized.styles = `@layer global{${serialized.styles}}`;
		return serialized;
	}
	return styles;
}
function GlobalStyles$1({ styles, themeId, defaultTheme = {} }) {
	const upperTheme = useTheme$1(defaultTheme);
	const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
	let globalStyles = typeof styles === "function" ? styles(resolvedTheme) : styles;
	if (resolvedTheme.modularCssLayers) if (Array.isArray(globalStyles)) globalStyles = globalStyles.map((styleArg) => {
		if (typeof styleArg === "function") return wrapGlobalLayer(styleArg(resolvedTheme));
		return wrapGlobalLayer(styleArg);
	});
	else globalStyles = wrapGlobalLayer(globalStyles);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$2, { styles: globalStyles });
}
GlobalStyles$1.propTypes = {
	/**
	* @ignore
	*/
	defaultTheme: import_prop_types.default.object,
	/**
	* @ignore
	*/
	styles: import_prop_types.default.oneOfType([
		import_prop_types.default.array,
		import_prop_types.default.func,
		import_prop_types.default.number,
		import_prop_types.default.object,
		import_prop_types.default.string,
		import_prop_types.default.bool
	]),
	/**
	* @ignore
	*/
	themeId: import_prop_types.default.string
};
//#endregion
//#region node_modules/@mui/utils/getDisplayName/getDisplayName.mjs
var import_react_is = require_react_is();
function getFunctionComponentName(Component, fallback = "") {
	return Component.displayName || Component.name || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
	const functionName = getFunctionComponentName(innerType);
	return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
/**
* cherry-pick from
* https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
* originally forked from recompose/getDisplayName
*/
function getDisplayName(Component) {
	if (Component == null) return;
	if (typeof Component === "string") return Component;
	if (typeof Component === "function") return getFunctionComponentName(Component, "Component");
	if (typeof Component === "object") switch (Component.$$typeof) {
		case import_react_is.ForwardRef: return getWrappedName(Component, Component.render, "ForwardRef");
		case import_react_is.Memo: return getWrappedName(Component, Component.type, "memo");
		default: return;
	}
}
//#endregion
//#region node_modules/@mui/system/createStyled/createStyled.mjs
var systemDefaultTheme = createTheme();
function shouldForwardProp(prop) {
	return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
function shallowLayer(serialized, layerName) {
	if (layerName && serialized && typeof serialized === "object" && serialized.styles && !serialized.styles.startsWith("@layer")) serialized.styles = `@layer ${layerName}{${String(serialized.styles)}}`;
	return serialized;
}
function defaultOverridesResolver(slot) {
	if (!slot) return null;
	return (_props, styles) => styles[slot];
}
function attachTheme(props, themeId, defaultTheme) {
	props.theme = isObjectEmpty(props.theme) ? defaultTheme : props.theme[themeId] || props.theme;
}
function processStyle(props, style, layerName) {
	const resolvedStyle = typeof style === "function" ? style(props) : style;
	if (Array.isArray(resolvedStyle)) return resolvedStyle.flatMap((subStyle) => processStyle(props, subStyle, layerName));
	if (Array.isArray(resolvedStyle?.variants)) {
		let rootStyle;
		if (resolvedStyle.isProcessed) rootStyle = layerName ? shallowLayer(resolvedStyle.style, layerName) : resolvedStyle.style;
		else {
			const { variants, ...otherStyles } = resolvedStyle;
			rootStyle = layerName ? shallowLayer(internal_serializeStyles(otherStyles), layerName) : otherStyles;
		}
		return processStyleVariants(props, resolvedStyle.variants, [rootStyle], layerName);
	}
	if (resolvedStyle?.isProcessed) return layerName ? shallowLayer(internal_serializeStyles(resolvedStyle.style), layerName) : resolvedStyle.style;
	return layerName ? shallowLayer(internal_serializeStyles(resolvedStyle), layerName) : resolvedStyle;
}
function processStyleVariants(props, variants, results = [], layerName = void 0) {
	let mergedState;
	variantLoop: for (let i = 0; i < variants.length; i += 1) {
		const variant = variants[i];
		if (typeof variant.props === "function") {
			mergedState ??= {
				...props,
				...props.ownerState,
				ownerState: props.ownerState
			};
			if (!variant.props(mergedState)) continue;
		} else for (const key in variant.props) if (props[key] !== variant.props[key] && props.ownerState?.[key] !== variant.props[key]) continue variantLoop;
		if (typeof variant.style === "function") {
			mergedState ??= {
				...props,
				...props.ownerState,
				ownerState: props.ownerState
			};
			results.push(layerName ? shallowLayer(internal_serializeStyles(variant.style(mergedState)), layerName) : variant.style(mergedState));
		} else results.push(layerName ? shallowLayer(internal_serializeStyles(variant.style), layerName) : variant.style);
	}
	return results;
}
function createStyled(input = {}) {
	const { themeId, defaultTheme = systemDefaultTheme, rootShouldForwardProp = shouldForwardProp, slotShouldForwardProp = shouldForwardProp } = input;
	function styleAttachTheme(props) {
		attachTheme(props, themeId, defaultTheme);
	}
	const styled = (tag, inputOptions = {}) => {
		internal_mutateStyles(tag, (styles) => styles.filter((style) => style !== styleFunctionSx_default));
		const { name: componentName, slot: componentSlot, skipVariantsResolver: inputSkipVariantsResolver, skipSx: inputSkipSx, overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)), ...options } = inputOptions;
		const layerName = componentName && componentName.startsWith("Mui") || !!componentSlot ? "components" : "custom";
		const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" && componentSlot !== "root" || false;
		const skipSx = inputSkipSx || false;
		let shouldForwardPropOption = shouldForwardProp;
		if (componentSlot === "Root" || componentSlot === "root") shouldForwardPropOption = rootShouldForwardProp;
		else if (componentSlot) shouldForwardPropOption = slotShouldForwardProp;
		else if (isStringTag(tag)) shouldForwardPropOption = void 0;
		const defaultStyledResolver = styled$1(tag, {
			shouldForwardProp: shouldForwardPropOption,
			label: generateStyledLabel(componentName, componentSlot),
			...options
		});
		const transformStyle = (style) => {
			if (style.__emotion_real === style) return style;
			if (typeof style === "function") return function styleFunctionProcessor(props) {
				return processStyle(props, style, props.theme.modularCssLayers ? layerName : void 0);
			};
			if (isPlainObject(style)) {
				const serialized = preprocessStyles(style);
				return function styleObjectProcessor(props) {
					if (!serialized.variants) return props.theme.modularCssLayers ? shallowLayer(serialized.style, layerName) : serialized.style;
					return processStyle(props, serialized, props.theme.modularCssLayers ? layerName : void 0);
				};
			}
			return style;
		};
		const muiStyledResolver = (...expressionsInput) => {
			const expressionsHead = [];
			const expressionsBody = expressionsInput.map(transformStyle);
			const expressionsTail = [];
			expressionsHead.push(styleAttachTheme);
			if (componentName && overridesResolver) expressionsTail.push(function styleThemeOverrides(props) {
				const styleOverrides = props.theme.components?.[componentName]?.styleOverrides;
				if (!styleOverrides) return null;
				const resolvedStyleOverrides = {};
				for (const slotKey in styleOverrides) resolvedStyleOverrides[slotKey] = processStyle(props, styleOverrides[slotKey], props.theme.modularCssLayers ? "theme" : void 0);
				return overridesResolver(props, resolvedStyleOverrides);
			});
			if (componentName && !skipVariantsResolver) expressionsTail.push(function styleThemeVariants(props) {
				const themeVariants = props.theme?.components?.[componentName]?.variants;
				if (!themeVariants) return null;
				return processStyleVariants(props, themeVariants, [], props.theme.modularCssLayers ? "theme" : void 0);
			});
			if (!skipSx) expressionsTail.push(styleFunctionSx_default);
			if (Array.isArray(expressionsBody[0])) {
				const inputStrings = expressionsBody.shift();
				const placeholdersHead = new Array(expressionsHead.length).fill("");
				const placeholdersTail = new Array(expressionsTail.length).fill("");
				let outputStrings;
				outputStrings = [
					...placeholdersHead,
					...inputStrings,
					...placeholdersTail
				];
				outputStrings.raw = [
					...placeholdersHead,
					...inputStrings.raw,
					...placeholdersTail
				];
				expressionsHead.unshift(outputStrings);
			}
			const Component = defaultStyledResolver(...[
				...expressionsHead,
				...expressionsBody,
				...expressionsTail
			]);
			if (tag.muiName) Component.muiName = tag.muiName;
			Component.displayName = generateDisplayName(componentName, componentSlot, tag);
			return Component;
		};
		if (defaultStyledResolver.withConfig) muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
		return muiStyledResolver;
	};
	return styled;
}
function generateDisplayName(componentName, componentSlot, tag) {
	if (componentName) return `${componentName}${capitalize(componentSlot || "")}`;
	return `Styled(${getDisplayName(tag)})`;
}
function generateStyledLabel(componentName, componentSlot) {
	let label;
	if (componentName) label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
	return label;
}
function isStringTag(tag) {
	return typeof tag === "string" && tag.charCodeAt(0) > 96;
}
function lowercaseFirstLetter(string) {
	if (!string) return string;
	return string.charAt(0).toLowerCase() + string.slice(1);
}
//#endregion
//#region node_modules/@mui/utils/resolveProps/resolveProps.mjs
/**
* Add keys, values of `defaultProps` that does not exist in `props`
* @param defaultProps
* @param props
* @param mergeClassNameAndStyle If `true`, merges `className` and `style` props instead of overriding them.
*   When `false` (default), props override defaultProps. When `true`, `className` values are concatenated
*   and `style` objects are merged with props taking precedence.
* @returns resolved props
*/
function resolveProps(defaultProps, props, mergeClassNameAndStyle = false) {
	const output = { ...props };
	for (const key in defaultProps) if (Object.prototype.hasOwnProperty.call(defaultProps, key)) {
		const propName = key;
		if (propName === "components" || propName === "slots") output[propName] = {
			...defaultProps[propName],
			...output[propName]
		};
		else if (propName === "componentsProps" || propName === "slotProps") {
			const defaultSlotProps = defaultProps[propName];
			const slotProps = props[propName];
			if (!slotProps) output[propName] = defaultSlotProps || {};
			else if (!defaultSlotProps) output[propName] = slotProps;
			else {
				output[propName] = { ...slotProps };
				for (const slotKey in defaultSlotProps) if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
					const slotPropName = slotKey;
					output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName], mergeClassNameAndStyle);
				}
			}
		} else if (propName === "className" && mergeClassNameAndStyle && props.className !== void 0) output.className = clsx(defaultProps?.className, props?.className);
		else if (propName === "style" && mergeClassNameAndStyle && props.style) output.style = {
			...defaultProps?.style,
			...props?.style
		};
		else if (output[propName] === void 0) output[propName] = defaultProps[propName];
	}
	return output;
}
//#endregion
//#region node_modules/@mui/system/DefaultPropsProvider/DefaultPropsProvider.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var PropsContext = /* @__PURE__ */ import_react.createContext(void 0);
function DefaultPropsProvider$1({ value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropsContext.Provider, {
		value,
		children
	});
}
DefaultPropsProvider$1.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* @ignore
	*/
	value: import_prop_types.default.object
};
function getThemeProps(params) {
	const { theme, name, props } = params;
	if (!theme || !theme.components || !theme.components[name]) return props;
	const config = theme.components[name];
	if (config.defaultProps) return resolveProps(config.defaultProps, props, theme.components.mergeClassNameAndStyle);
	if (!config.styleOverrides && !config.variants) return resolveProps(config, props, theme.components.mergeClassNameAndStyle);
	return props;
}
function useDefaultProps$1({ props, name }) {
	return getThemeProps({
		props,
		name,
		theme: { components: import_react.useContext(PropsContext) }
	});
}
//#endregion
//#region node_modules/@mui/material/styles/defaultTheme.mjs
var defaultTheme = createTheme$1();
//#endregion
//#region node_modules/@mui/material/styles/useTheme.mjs
function useTheme() {
	const theme = useTheme$1(defaultTheme);
	import_react.useDebugValue(theme);
	return theme["$$material"] || theme;
}
//#endregion
//#region node_modules/@mui/material/GlobalStyles/GlobalStyles.mjs
function GlobalStyles(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles$1, {
		...props,
		defaultTheme,
		themeId: identifier_default
	});
}
GlobalStyles.propTypes = { 
/**
* The styles you want to apply globally.
*/
styles: import_prop_types.default.oneOfType([
	import_prop_types.default.array,
	import_prop_types.default.func,
	import_prop_types.default.number,
	import_prop_types.default.object,
	import_prop_types.default.string,
	import_prop_types.default.bool
]) };
//#endregion
//#region node_modules/@mui/material/styles/slotShouldForwardProp.mjs
function slotShouldForwardProp(prop) {
	return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
//#endregion
//#region node_modules/@mui/material/styles/rootShouldForwardProp.mjs
var rootShouldForwardProp = (prop) => slotShouldForwardProp(prop) && prop !== "classes";
//#endregion
//#region node_modules/@mui/material/styles/styled.mjs
var styled = createStyled({
	themeId: identifier_default,
	defaultTheme,
	rootShouldForwardProp
});
//#endregion
//#region node_modules/@mui/material/zero-styled/index.mjs
function globalCss(styles) {
	return function GlobalStylesWrapper(props) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalStyles, { styles: typeof styles === "function" ? (theme) => styles({
			theme,
			...props
		}) : styles });
	};
}
//#endregion
//#region node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.mjs
function DefaultPropsProvider(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultPropsProvider$1, { ...props });
}
DefaultPropsProvider.propTypes = {
	/**
	* @ignore
	*/
	children: import_prop_types.default.node,
	/**
	* @ignore
	*/
	value: import_prop_types.default.object.isRequired
};
function useDefaultProps(params) {
	return useDefaultProps$1(params);
}
//#endregion
export { slotShouldForwardProp as a, rootShouldForwardProp as i, globalCss as n, useTheme as o, styled as r, composeClasses as s, useDefaultProps as t };

//# sourceMappingURL=DefaultPropsProvider-CVhupdjA.js.map