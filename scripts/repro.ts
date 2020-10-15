import { ApiPackage, ApiModel, ApiItemKind, ApiFunction } from '@microsoft/api-extractor-model';

const pack = ApiPackage.loadFromJsonFile('temp/api-extractor-global-repro.api.json');

const entry = pack.members[0];
// This finds the function that has the interface with the name "TextTrack_2" as a return type.
const func: ApiFunction = entry.members.find((item) => item.kind === ApiItemKind.Function) as ApiFunction;

// Get the reference to said interface
const ref = func.excerptTokens.find((token) => !!token.canonicalReference)?.canonicalReference;
console.log(ref?.symbol?.toString());

const model = new ApiModel();
model.addMember(pack);

const resultFuncLookup = model.resolveDeclarationReference(func.canonicalReference, entry);
console.log(resultFuncLookup); // This is successful
const resultInterfaceLookupFromFuncReturn = model.resolveDeclarationReference(ref!, entry);
console.log(resultInterfaceLookupFromFuncReturn); // This is not
