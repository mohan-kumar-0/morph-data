/**
 * data-morph-pro
 * Professional data conversion utility.
 */

class MorphData {
    /**
     * Converts CSV string to JSON array of objects.
     * @param {string} csv - The CSV content.
     * @param {string} delimiter - Default is comma.
     * @returns {Array<Object>}
     */
    csvToJson(csv, delimiter = ',') {
        if (!csv) return [];
        const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) return [];

        const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));

        return lines.slice(1).map(line => {
            const values = this._parseCsvLine(line, delimiter);
            return headers.reduce((obj, header, index) => {
                let val = values[index] || '';
                val = val.trim().replace(/^"|"$/g, '');
                // Auto-type conversion
                if (val === 'true') val = true;
                else if (val === 'false') val = false;
                else if (!isNaN(val) && val !== '') val = Number(val);

                obj[header] = val;
                return obj;
            }, {});
        });
    }

    /**
     * Converts JSON array of objects to CSV string.
     * @param {Array<Object>} json - Array of objects.
     * @param {string} delimiter - Default is comma.
     * @returns {string}
     */
    jsonToCsv(json, delimiter = ',') {
        if (!Array.isArray(json) || json.length === 0) return '';

        const headers = Object.keys(json[0]);
        const csvLines = [headers.join(delimiter)];

        json.forEach(obj => {
            const values = headers.map(header => {
                let val = obj[header];
                if (val === null || val === undefined) val = '';
                val = String(val);
                // Escape quotes and wrap in quotes if contains delimiter or newline
                if (val.includes(delimiter) || val.includes('"') || val.includes('\n')) {
                    val = `"${val.replace(/"/g, '""')}"`;
                }
                return val;
            });
            csvLines.push(values.join(delimiter));
        });

        return csvLines.join('\n');
    }

    /**
     * Internal helper to handle quoted values in CSV.
     */
    _parseCsvLine(line, delimiter) {
        const result = [];
        let curVal = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === delimiter && !inQuotes) {
                result.push(curVal);
                curVal = '';
            } else {
                curVal += char;
            }
        }
        result.push(curVal);
        return result;
    }

    /**
     * Helper to convert JSON to a basic YAML format.
     * (Simplified version for direct usage)
     */
    jsonToYaml(json, indent = 2) {
        const format = (data, level = 0) => {
            const spacing = ' '.repeat(level * indent);
            if (Array.isArray(data)) {
                return data.map(item => `\n${spacing}- ${format(item, level + 1)}`).join('').trim();
            } else if (typeof data === 'object' && data !== null) {
                return Object.entries(data)
                    .map(([key, val]) => `\n${spacing}${key}: ${format(val, level + 1)}`)
                    .join('')
                    .trim();
            }
            return String(data);
        };
        return format(json);
    }

    /**
     * Converts JSON array of objects to a Markdown Table string.
     * @param {Array<Object>} json
     * @returns {string}
     */
    jsonToMarkdownTable(json) {
        if (!Array.isArray(json) || json.length === 0) return '';

        const headers = Object.keys(json[0]);
        const headerRow = `| ${headers.join(' | ')} |`;
        const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;

        const bodyRows = json.map(obj => {
            const values = headers.map(header => {
                let val = obj[header];
                if (val === null || val === undefined) val = '';
                return String(val).replace(/\|/g, '\\|'); // Escape pipes
            });
            return `| ${values.join(' | ')} |`;
        });

        return [headerRow, separatorRow, ...bodyRows].join('\n');
    }
}

module.exports = new MorphData();
module.exports.MorphData = MorphData;
