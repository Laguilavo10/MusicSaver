def sanitize_filename(filename):
    invalid_chars = '<>:"/\\|?*,.'
    for char in invalid_chars:
        filename = filename.replace(char, '')
    return filename
