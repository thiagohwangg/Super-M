import clsx from "clsx"

export default function Input(props) {
    const {className, type = "text", required, placeholder, ...rest} = props;
    const classes = clsx({
        input:  true
    }, className)
  return (
    <label className="label">
    {placeholder}
    {required && <span className="input-required">*</span>}
    <div>
        <input className={classes} type={type} required={required} placeholder={placeholder} {...rest} />
    </div>
    </label>

  )
}
