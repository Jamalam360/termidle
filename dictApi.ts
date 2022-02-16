export class DictionaryAPI {
  public async exists(
    word: string,
  ): Promise<boolean> {
    const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";

    const res = await fetch(
      `${baseUrl}/${word}`,
    );

    return res.status == 200;
  }
}
