import {ChangeEvent, FC} from 'react';

const Selector: FC<{options: string[], callback: (e: ChangeEvent<HTMLSelectElement>) => void, defaultLng?: string | null, defaultTheme?: string | null}> =
    ({options, callback, defaultLng, defaultTheme}) => {
    return (
        <select onChange={(e) => callback(e)} defaultValue={defaultLng ?? defaultTheme}>
            {options.map(item => (
                <option key={item}>{item}</option>
            ))}
        </select>
    );
};

export default Selector;