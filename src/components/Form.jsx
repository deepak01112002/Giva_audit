import Box from '../common/Box';
import Button from '../common/Button';
import Stack from '../common/Stack';
import TagFieldBuilder from '../common/TagFieldbuilder';

export default function Form({
  formContent,
  formData,
  isNextValid,
  handleOnChange,
  handleOnSubmit,
  handleOnPrev,
  activeFormId,
  selectedSubTab,
}) {
  console.log('Form -> formData', formData);
  return (
    <>
      <form key={activeFormId} onSubmit={handleOnSubmit.bind(this)}>
        {formContent
          ?.filter(
            (element) =>
              element.sub_tab === selectedSubTab || element.sub_tab === ''
          )
          .map((element, i) => (
            <TagFieldBuilder
              key={element.attributes?.props?.name || i}
              {...element}
              handleOnChange={handleOnChange}
              inputValue={formData}
            />
          ))}

        <Box sx={{ width: '90%', typography: 'body1' }}>
          <Stack direction="row">
            {formContent.form_position != 1 ? (
              <Button
                color="success"
                sx={{ margin: '10px', marginTop: '20px' }}
                title="Prev"
                onClick={handleOnPrev}
              />
            ) : null}
            <Button
              title={isNextValid ? 'Next' : 'Submit'}
              type="submit"
              sx={{ margin: '10px', marginTop: '20px' }}
            />
          </Stack>
        </Box>
      </form>
    </>
  );
}
